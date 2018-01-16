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
/* eslint-disable */
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  created() {
	  axios.get ('https://badwlrz-gerdi04.srv.lrz.de/api/admin/gerdi/_search?q=*', {
		  headers: {
			  'Access-Control-Allow-Origin': '*'
		  },
		  auth: {
			  username: 'admin',
	          password: 'DssPfG'
		  }
	  })
      .then((response) => {
        console.log(response.headers)
		console.log(response.data)
        this.posts = response.data
      })
      .catch((error) => {
        console.log(error)
        this.errors.push(error)
      })
  }
}
</script>
