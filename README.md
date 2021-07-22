# Vue-News

네트워크 통신으로 API를 호출하여 데이터를 받아와 Vue.js 사용해 화면을 구현하는 강의를 듣고 클론 코딩한 프로젝트입니다.   

 ## 🛠 Skill & Tool
 **`HTML5`**  **`CSS3`**  **`Javascript`**  **`Vue.js`**  **`axios`** 
 
## 💡 기능
### axios 라이브러리를 통한 API 요청
### Vue Router로 링크 이동과 동적 라우팅 적용
 
## 📖 프로젝트를 하며 공부한 것
 - **비동기 로직에서의 this 처리와 ES6 화살표 함수**    
  자바스크립트 범위는 기본적으로 전역(window)으로 시작한다. 함수 안에서도 this는 기본적으로 전역을 가리키는데 비동기 호출을 할 때에는
  현재 위치에서의 this를 벗어난 this가 생성된다. 
    ```
    import { fetchNewsList } from '../api/index.js';

    export default {
      data() {
        return {
          users: []
        }
      },
      created() {
        console.log('호출 전', this); // Vue component
        fetchNewsList()
          .then(function(response) {
            console.log('호출 후', this) // undefined
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
    ```
    그래서 this 바인딩을 해주어야 한다.
    ```
    created() {
        var vm = this;
        fetchNewsList()
          .then(function(response) {
				    vm.users = response.data;
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    ```
    그러나 ES6의 화살표 함수를 사용하면 비동기 처리 후의 this가 비동기 처리가 호출 되는 위치의 this를 가지고 와서 따로 바인딩을 해줄 필요가 없다.
    ```
    created() {
      fetchNewsList()
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error)
        })
    }
    ```
    
  
 - **axios 라이브러리를 이용한 API 호출 및 모듈화**    
 `axios` 는 ES6의 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다. 웹 API인 fetch()를 통해 간단하게 네트워크 통신을 할 수 있지만 fetch()와 달리
 예전 버전의 브라우저도 지원해주고 HTTP 요청과 응답을 JSON으로 변환하지 않아도 자동으로 변환시켜준다. 
   - HTTP Request & Response와 관련된 기본 설정(공통적으로 적용되는 부분은 axios에서 제공하는 baseUrl 사용)
   - API 함수들을 정리    
  
    ```
    import axios from 'axios';

    const config = {
      baseUrl: 'https://api.hnpwa.com/v0'
    }

    function fetchNewsList() {
      return axios.get(`${config.baseUrl}/news/1.json`);
    }
    function fetchAskList() {
      return axios.get(`${config.baseUrl}/ask/1.json`);
    }

    export { fetchNewsList, fetchAskList }
    ```
   
 - **동적 라우팅으로 상세 페이지 구현**    
 라우터의 path의 경로 뒤에 동적 세그먼트인 `/:id`를 붙여주면 같은 컴포넌트의 동일한 레이아웃을 가진 id별 다른 정보를 화면에 보여줄 수 있다.
   ```
   // router

    export const router = new VueRouter({
      mode:'history',
      routes: [
        {
          path: '/', 
          redirect: '/news', 
        }
        {
          path: '/news',
          component: 'NewsView', 
        }
        {
          path: '/users/:id',
          component: 'UserView',  
        }
      ]
    })
   ```
    router-link 태그의 to 속성에 넘겨줄 id를 전달하면 id가 path로 넘어온다. Vue 개발자도구에서 확인해보면 동적 라우트 매칭에 의해 $route의 params로 id가 넘어온 것을 확인할 수 있다. 
    ```
    <template>
      <router-link v-bind:to="`/user/${id}`">{{ item.user }}</router-link>
    </template>
    ```
  
  - **slot으로 만든 공통 컴포넌트 사용**    
  같은 데이터를 받아오는데 API 마다 접근하는 속성이 다를 때 slot으로 컴포넌트를 만들어 재사용 할 수 있다.
    ```
    // 공통 컴포넌트(하위 컴포넌트)
    <template>
      <div>
        <slot name="username"></slot>
        <slot namr="time"></slot>
        <slot namr="karma"></slot>
      </div>
    </template>

    <script>
    export default {
      props: {
        info: Object
      }
    }
    </script>
    ```

    ```
    // ItemView.vue
    <template>
      <div>
        <user-profile :info="fetchedItem">
          <rotuer-link slot="username" :to="`/user/${fetchedItem.user}`">{{ fetchedItem.user }}</rotuer-link>
          <template slot="time">{{ fetchedItem.tiem_ago }}</template>
        </user-profile>
      </div>
    </template>
    ```

    ```
    // UserView.vue
    <template>
      <div>
        <user-profile :info="userInfo">
          <div slot="username">{{ userInfo.id }}</div>
          <template slot="time">{{ userInfo.created }}</template>
          <div slot="karma">{{ userInfo.karma }}</div>
        </user-profile>
      </div>
    </template>
    ```
  
  - **HOC와 Mixin으로 코드 재사용**    
  각각의 컴포넌트에 같은 기능을 하는 로직이 중복 작성되어 있을 때 하이 오더 컴포넌트(HOC)나 Mixin을 만들어 
  중복된 코드를 하나의 컴포넌트에서 처리할 수 있도록 한다. 
    - HOC : 상하위 컴포넌트 사이에 레이어가 하나 더 생긴다. 대신 상하위 컴포넌트 로직은 변경하지 않아도 되고 추가 로직은 HOC에서 처리하면 된다. 
    ```
    import ListView from './views/ListView.vue';
    import bus from '../utils/bus.js';

    export default function createListView(name) {
      return {
        // 재사용할 인스턴스(컴포넌트) 옵션들
        name: 'HOC component',
        created() {
          bus.$emit('start:spinner');
          this.$store.dispatch('FETCH_LIST', this.$route.name)
            .then(() => {
              bus.$emit('end:spinner');
            })
            .catch(error => console.log(error))
        },
        render(createElement) {
          return createElement(ListView);
        }

      }	
    }
    ```
    ```
    // router
    ...
    import createListView from '../views/createListView.js';

    Vue.use(VueRouter);

    export const router = new VueRouter({
      mode: 'history',
      routes: [
        {
          path: '/news',
          name: 'news',
          //component: NewsView
          component: createListView('NewsView');
        },
        {
          path: '/ask',
          name: 'ask',
          //component: AskView
          component: createListView('AskView');
        },
        {
          path: '/jobs',
          name: 'jobs',
          //component: JobsView
          component: createListView('JobsView');
        }
      ]

    })
    ```
    
    - Mixin : 로딩스피너나 모달 등을 mixin으로 빼면 효율이 좋다. 라우터는 기존 방법대로 사용하면 된다.
    ```
    // src/mixins/ListMixin.js
    import bus from '../utils/bus.js';

    export default {
      // 재사용할 컴포넌트 옵션 & 로직
      created() {
          bus.$emit('start:spinner');
          this.$store.dispatch('FETCH_LIST', this.$route.name)
            .then(() => {
              bus.$emit('end:spinner');
            })
            .catch(error => console.log(error))
        },
    }
    ```
    ```
    // NewsView.vus
    <template>
      <list-item></list-item>
    </template>

    <script>
    import ListItem from '../components/ListItem.vue';
    import LsitMixin from '../mixins/ListMixin.js';

    export default {
      components: {
        ListItem,
      },
      mixins: [ListMixin],
    }
    </script>
    ```
    
  - **Router Navigation Guard를 이용한 데이터 호출**    
  라우터로 특정 url에 접근 하기 전에 동작을 정의하는 속성이다. 로직이 끝난 후 `next()`를 호출해야 그 url로 이동한다. 
  컴포넌트가 생성 되자마자 호출되는 라이프 사이클 훅인 created() 보다 Router Navigation Guard가 먼저 호출된다.  
  
    
    
    
  
    
    
    