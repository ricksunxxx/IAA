import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/page/login')), 'Login');
const Home = r => require.ensure([], () => r(require('@/page/home')), 'Home');
const My = r => require.ensure([], () => r(require('@/page/my')), 'My');
const AboutUs = r => require.ensure([], () => r(require('@/page/aboutUs')), 'AboutUs');
const CarInsurance = r => require.ensure([], () => r(require('@/page/carInsurance')), 'CarInsurance');
const Help = r => require.ensure([], () => r(require('@/page/help')), 'Help');
const OrderCenter = r => require.ensure([], () => r(require('@/page/orderCenter')), 'OrderCenter');
const OrderDetail = r => require.ensure([], () => r(require('@/page/orderDetail')), 'OrderDetail');
const PersonalInfo = r => require.ensure([], () => r(require('@/page/personalInfo')), 'PersonalInfo');
//const Register = r => require.ensure([], () => r(require('@/page/register')), 'Register');
const CarIntroduce = r => require.ensure([], () => r(require('@/page/carIntroduce')), 'Register');
const ProductSearch = r => require.ensure([], () => r(require('@/page/productSearch')), 'ProductSearch');
const MyInfor = r => require.ensure([], () => r(require('@/page/myInfor')), 'MyInfor');


export default new Router({
    routes: [{
        path: '/',
        component: App,
        children: [{
            path: '',
            redirect: '/login'
        }, {
            path: '/home',
            name: 'Home',
            component: Home
        }, {
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/my',
            name: 'My',
            component: My
        }, {
            path: '/aboutUs',
            name: 'AboutUs',
            component: AboutUs
        }, {
            path: '/carInsurance',
            name: 'CarInsurance',
            component: CarInsurance
        }, {
            path: '/help',
            name: 'Help',
            component: Help
        }, {
            path: '/orderCenter',
            name: 'OrderCenter',
            component: OrderCenter
        }, {
            path: '/orderDetail',
            name: 'OrderDetail',
            component: OrderDetail
        }, {
            path: '/personalInfo',
            name: 'PersonalInfo',
            component: PersonalInfo
        }, {
            path: '/carIntroduce',
            name: 'CarIntroduce',
            component: CarIntroduce
        }, {
            path: '/productSearch',
            name: 'ProductSearch',
            component: ProductSearch
        }, {
            path: '/myInfor',
            name: 'MyInfor',
            component: MyInfor
        }]
    }]
});