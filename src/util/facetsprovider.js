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

const availableFacets = [
  {
    name: 'publisher',
    title: 'Publisher',
    esFieldName: 'publisher.raw',
    esSubFieldName: 'publisher'
  },
  {
    name: 'author',
    title: 'Author',
    esFieldName: 'creators.creatorName.value.raw',
    esSubFieldName: 'creators.creatorName.value'
  },
  {
    name: 'language',
    title: 'Language',
    esFieldName: 'language',
    esSubFieldName: 'language'
  },
  {
    name: 'year',
    title: 'Publication Year',
    esFieldName: 'publicationYear',
    esSubFieldName: 'publicationYear',
    esConverter: x => new Date(x).getYear() + 1900,
    esSubQueryBuilder: selectedYears => ({
      range: {
        publicationYear: {
          gte: Math.min.apply(null, selectedYears),
          lte: Math.max.apply(null, selectedYears)
        }
      }
    })
  }
]

// export all facets and facet names as arrays resp. facets as object with facet name as key
export default {
  facetNames: availableFacets.map(facet => facet.name),
  allFacets: availableFacets,
  facet: availableFacets.reduce(
    (obj, facet) => Object.assign(obj, { [facet.name]: facet }),
    {}
  )
}
