/**
 * @Author: Andree Ray <andreeray>
 * @Date:   2018-01-18T21:21:50+01:00
 * @Email:  andreeray@live.com
 * @Filename: router.js
 * @Last modified by:   andreeray
 * @Last modified time: 2018-01-18T21:26:42+01:00
 */

import Home     from '../components/site/Home.vue'
import Overview from '../components/admin/dashboard/overview/Overview.vue'
import Tasks    from '../components/admin/dashboard/tasks/Tasks.vue'
import Notes    from '../components/admin/dashboard/notes/Notes.vue'
import Data     from '../components/admin/setting/data/Data.vue'
import Users    from '../components/admin/setting/users/Users.vue'
import User     from '../components/admin/setting/users/User.vue'

import store from '../store/store'

function authenticate( to, from, next ) {
    // We can se if a user is refreshing a page when there is no page he is navigating from
    if( !from.name ) {
        store.dispatch( 'setLocation', to.name )
    }

    if( store.getters.token ) {
        next()
    } else {
        next('/')
    }
}

export default [{
        path: '/admin/overview',
        component: Overview,
        name: 'overview',
        beforeEnter: authenticate
    },
    {
        path: '/admin/tasks',
        component: Tasks,
        name: 'tasks',
        beforeEnter: authenticate
    },
    {
        path: '/admin/notes',
        component: Notes,
        name: 'notes',
        beforeEnter: authenticate
    },
    {
        path: '/admin/data',
        component: Data,
        name: 'data',
        beforeEnter: authenticate
    },
    {
        path: '/admin/users',
        component: Users,
        name: 'users',
        beforeEnter: authenticate
    },
    {
        path: '/admin/user',
        component: User,
        name: 'user'
    },
    {
      path: '*',
      component: Home,
      name: 'home'
    }
]
