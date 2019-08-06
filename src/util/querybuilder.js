/**
 * Copyright 2018 Nelson Tavares de Sousa, Ingo Thomsen
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
import facetsprovider from './facetsprovider.js'

export default {
  buildQuery (queryString, constraints) {
    var queryBody = buildQueryBody(queryString)
    facetsprovider.allFacets.forEach(facet => {
      if (constraints[facet.name] && constraints[facet.name].length > 0) {
        if (facet.esSubQueryBuilder) {
          queryBody.query.bool.must.push(
            facet.esSubQueryBuilder(constraints[facet.name])
          )
        } else {
          queryBody.query.bool.must.push(
            buildSubQuery(constraints[facet.name], facet.esSubFieldName)
          )
        }
      }
    })
    return queryBody
  }
}

function buildQueryBody (queryString) {
  var queryBody = {
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: queryString
            }
          }
        ]
      }
    }
  }
  queryBody.aggs = {}
  facetsprovider.allFacets.forEach(facet => {
    queryBody.aggs[facet.name] = {
      terms: {
        field: facet.esFieldName,
        size: 300,
        order: {
          _count: 'desc'
        }
      }
    }
  })
  return queryBody
}

function buildSubQuery (elems, fieldName) {
  let subQuery = {
    bool: {
      should: []
    }
  }
  elems.forEach(function (elem) {
    let subField = {}
    subField[fieldName] = elem
    subQuery.bool.should.push({ match_phrase: subField })
  })
  return subQuery
}
