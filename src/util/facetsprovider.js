/**
 * Copyright 2019 Ingo Thomsen
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

const availableFacets = {
  publisher: {
    name: 'publisher',
    title: 'Publisher',
    fieldName: 'publisher.raw',
    subFieldName: 'publisher'
  },
  author: {
    name: 'author',
    title: 'Author',
    fieldName: 'creators.creatorName.value.raw',
    subFieldName: 'creators.creatorName.value'
  },
  language: {
    name: 'language',
    title: 'Language',
    fieldName: 'language',
    subFieldName: 'language'
  },
  year: {
    name: 'year',
    title: 'Publication Year',
    fieldName: 'publicationYear',
    subFieldName: 'publicationYear',
    converter: x => new Date(x).getYear() + 1900,
    subQueryBuilder: selectedYears => ({
      range: {
        publicationYear: {
          gte: Math.min.apply(null, selectedYears),
          lte: Math.max.apply(null, selectedYears)
        }
      }
    })
  }
}

// export all facets and facet names as arrays resp. facets as object with facet name as key
export default {
  getFacetNames () {
    return Object.keys(availableFacets)
  },
  getFacet (facetName) {
    return availableFacets[facetName]
  },
  getAllFacets () {
    return Object.values(availableFacets)
  }
}
