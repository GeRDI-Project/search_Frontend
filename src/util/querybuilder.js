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

/* eslint-disable */
const constants = {
  facets: ["publisher", "author", "year", "language"],
  facetFieldNames: { publisher: "publisher.raw", author: "creators.creatorName.value.raw", year: "publicationYear", language: "language" },
  facetSubFieldNames: { publisher: "publisher", author: "creators.creatorName.value", year: "publicationYear", language: "language" },
  facetSubQueryBuilder: {
    year: selectedYears => {
      return {
        range: {
          publicationYear: {
            gte: Math.min.apply(null, selectedYears),
            lte: Math.max.apply(null, selectedYears)
          }
        }
      }
    }
  }
}

export default {
  buildQuery(queryString, constraints) {
    var queryBody = buildQueryBody(queryString)
    constants.facets.forEach(facet => {
      if (constraints[facet] && constraints[facet].length > 0) {
        if (constants.facetSubQueryBuilder[facet]) {
          queryBody.query.bool.must.push(constants.facetSubQueryBuilder[facet](constraints[facet]))
        } else {
          queryBody.query.bool.must.push(buildSubQuery(constraints[facet], constants.facetSubFieldNames[facet]))
        }
      }
    })
    return queryBody
  }
}

function buildQueryBody(queryString) {
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
  constants.facets.forEach(facet => {
    queryBody.aggs[facet] = {
      terms: {
        field: constants.facetFieldNames[facet],
        order: { '_count': 'desc' },
        size: 300
      }
    }
  })
  return queryBody
}

function buildSubQuery(elems, fieldName) {
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
