import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { NavBar, Svg, Icon, IconButton, Dropdown } from '../';
import { Swiper, SwiperSlide } from 'swiper/react';

function Header({
  children,
  menuOptions,
  isReturnEnabled,
  onClickReturnButton,
  isSticky,
  WhiteLabeling,
  tabs,
}) {
  const { t } = useTranslation('Header');

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };

  const CustomLogo = React => {
    return WhiteLabeling.createLogoComponentFn(React);
  };

  return (
    <NavBar
      className="justify-between border-b-4 border-black"
      isSticky={isSticky}
    >
      <div className="flex justify-between flex-1">
        <div className="flex items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          <div
            className={classNames(
              'inline-flex items-center mr-3',
              isReturnEnabled && 'cursor-pointer'
            )}
            onClick={onClickReturn}
          >
            {isReturnEnabled && (
              <Icon name="chevron-left" className="w-8 text-comiere-black" />
            )}
            {/* <div className="ml-4">{WhiteLabeling ? CustomLogo(React) : <Svg name="logo-ohif" />}</div> */}
          </div>
        </div>
        <div className="flex items-center">
          {children}
          {/* {tabs.map((obj, index) => (
            <SwiperSlide key={index}>
              <div
                className={classnames(
                  index === activeTabIndex
                    ? 'bg-secondary-main text-white'
                    : 'text-aqua-pale',
                  'flex cursor-pointer px-4 py-1 rounded-[4px]  flex-col justify-center items-center text-center hover:text-white'
                )}
                key={index}
                onClick={() => {
                  setActiveTabIndex(index);
                  setPanelOpen(true);
                }}
                data-cy={`${obj.name}-btn`}
              >
                <span>
                  <Icon
                    name={obj.iconName}
                    className={classnames(
                      index === activeTabIndex
                        ? 'text-white'
                        : 'text-primary-active'
                    )}
                    style={{
                      width: '22px',
                      height: '22px',
                    }}
                  />
                </span>
                <span className="text-[10px] select-none font-medium whitespace-nowrap mt-[5px]">
                  {obj.label}
                </span>
              </div>
            </SwiperSlide>
          ))} */}
        </div>

        <div className="flex items-center">
          <Dropdown id="options" showDropdownIcon={false} list={menuOptions}>
            <IconButton
              id={'options-settings-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-comiere-black"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              id={'options-chevron-down-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-comiere-black"
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown>
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.element,
};

Header.defaultProps = {
  isReturnEnabled: true,
  isSticky: false,
};

export default Header;
