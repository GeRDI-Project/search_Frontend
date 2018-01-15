<template>
<ul v-if="posts && posts.length">
  <li v-for="post of posts">
    <p><strong>{{post.title}}</strong></p>
    <p>{{post.body}}</p>
  </li>
</ul>

<ul v-else="errors && errors.length">
  <li v-for="error of errors">
    {{error.message}}
  </li>
</ul>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: [],
      errors: []
    }
  },

  mounted () {
    axios({
      method: 'get',
      url: `https://badwlrz-gerdi04.srv.lrz.de/api/admin/gerdi/_search`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      auth: {
        username: 'admin',
        password: 'DssPfG'
      }
    })
      .then((response) => {
        console.log(response.data)
        this.posts = response.data
      })
      // axios.get(`http://jsonplaceholder.typicode.com/posts`)
      // .then((response) => {
      // console.log(response.data)
      // this.posts = response.data
      // })
      .catch((error) => {
        console.log(error)
        this.errors.push(error)
      })
  }
}
</script>
