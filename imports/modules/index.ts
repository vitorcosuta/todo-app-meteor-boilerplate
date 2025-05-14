import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import UserProfile from './userprofile/config';
import ToDos from './toDos/config';

const pages: Array<IRoute | null> = [
	...ToDos.pagesRouterList,
	...UserProfile.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	...ToDos.pagesMenuItemList,
	...UserProfile.pagesMenuItemList
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
