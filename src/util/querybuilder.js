/**
 * Copyright 2018 Nelson Tavares de Sousa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /* eslint-disable */
export default {
  buildQuery(qs, facets){
    let queryBody = {
                      query: {
                        bool: {
                          must: [
                            {
                              query_string: {
                                query: "*"
                              }
                            }
                          ]
                        }
                      },
                      aggs: {
                        PublicationYear: {
                          terms: {
                            field: 'publicationYear',
                            order : { '_count' : 'desc' }
                          }
                        },
                        Publisher: {
                          terms: {
                            field: 'publisher.raw',
                            order : { '_count' : 'desc' }
                          }
                        },
                        Creator: {
                          terms: {
                            field: 'creators.creatorName.value.raw',
                            order : { '_count' : 'desc' }
                          }
                        },
                        Language: {
                          terms: {
                            field: 'language',
                            order : { '_count' : 'desc' }
                          }
                        }
                      }
                    }

    if (facets.selectedPublishers != undefined && facets.selectedPublishers.length > 0) {
      queryBody.query.bool.must.push(buildSubQuery(facets.selectedPublishers, 'publisher'))
    }
    if (facets.selectedAuthors != undefined && facets.selectedAuthors.length > 0) {
      queryBody.query.bool.must.push(buildSubQuery(facets.selectedAuthors, 'creators.creatorName.value'))
    }
    return queryBody
  }
}

function buildSubQuery(elems, fieldName) {
  let subQuery = {
    bool: {
      should: []
    }
  }
  elems.forEach(function(elem) {
      let subField = {}
      subField[fieldName] = elem
      subQuery.bool.should.push({match_phrase: subField})
    }
  )
  return subQuery
}
