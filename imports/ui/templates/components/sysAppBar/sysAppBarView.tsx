import React, { Fragment, ReactNode, useContext } from 'react';
import Styles from './sysAppBarStyles';
import Context, { ISysAppBarContext } from './sysAppBarContext';
import SysMenu from '/imports/ui/components/sysMenu/sysMenuProvider';
import SysAvatar from '/imports/ui/components/sysAvatar/sysAvatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ISysAppBar{
  logo?: ReactNode;
}

const SysAppBarView: React.FC<ISysAppBar> = ({logo}) => {
  const controller = useContext<ISysAppBarContext>(Context);
  
  return (
    <Styles.wrapper>
      <Styles.container>
        {logo}
        <Fragment>
          <Styles.avatarContainer onClick={controller.abrirMenuPerfil}>
            <SysAvatar 
                name={ controller.userName } 
                activateOutline
                size='large'
              />
              <ArrowDropDownIcon fontSize='small' sx={{ color: (theme)=> theme.palette.text.secondary }} />
          </Styles.avatarContainer>

          {/* Menu flutuante que aparece ao clicar no avatar */}
          <SysMenu
              ref={controller.menuPerfilRef}
              options={controller.getOpcoesMenuDeUsuario()}
              activeArrow
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            />
        </Fragment>
      </Styles.container>
    </Styles.wrapper>
  );
};

export default SysAppBarView;