import HomeController from '../pages/home/homeController';
import { SignUp } from '../../sysPages/pages/signUp/signUp';
import { IRoute } from '../../modules/modulesTypings';
import { NoPermission } from '../../sysPages/pages/noPermission/noPermission';
import SignInPage from '../pages/signIn/signIn';
import { HomeResources } from './recursos';

export const pagesRouterList: (IRoute | null)[] = [
	{
		path: '/',
		component: HomeController,
		isProtected: true,
		resources: [HomeResources.HOME_VIEW]
	},
	{
		path: '/signin',
		component: SignInPage,
		isProtected: false,
		templateVariant: 'None'
	},
	{
		path: '/signup',
		component: SignUp,
		isProtected: false,
		templateVariant: 'None'
	},
	{
		path: '/no-permission',
		component: NoPermission,
		isProtected: true
	}
];
