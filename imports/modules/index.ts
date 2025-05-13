import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Example from './example/config';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';
import ToDos from './toDos/config';

const pages: Array<IRoute | null> = [
	...Example.pagesRouterList, 
	...Aniversario.pagesRouterList, 
	...ToDos.pagesRouterList,
	...UserProfile.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	...Example.pagesMenuItemList, 
	...Aniversario.pagesMenuItemList,
	...ToDos.pagesMenuItemList,
	...UserProfile.pagesMenuItemList
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
