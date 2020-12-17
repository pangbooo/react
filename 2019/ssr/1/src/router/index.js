import NestedRoute from './NestedRoute';
import StatusRoute from './StatusRoute';
import Bar from "../views/Bar";
import Baz from "../views/Baz";
import Foo from "../views/Foo";
import TopList from "../containers/TopList";
import Parent from "../views/Parent";
import Child from "../views/Child";
import Login from "../views/Login";

const router = [
    {
        path: '/bar',
        component: Bar
    },
    {
        path: '/baz',
        component: Baz
    },
    {
        path: '/foo',
        component: Foo
    },
    {
        path: '/top-list',
        component: TopList,
        exact: true
    },
    {
        path:'/parent',
        component: Parent,
        routes: [
            {
                path: '/child',
                component: Child
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        exact: true
    },
];

export {
    router,
    NestedRoute,
    StatusRoute
}