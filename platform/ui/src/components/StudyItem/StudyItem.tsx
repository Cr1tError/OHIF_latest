import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './StudyItem.css';
import { Icon } from '../';
import IconDown from '../../assets/icons/arrow-down2.svg';
import { ButtonGroup, Button, ThumbnailList } from '../';
import { paletteColors } from '../../../static/paletteColors';

const baseClasses =
  'first:border-0 border-t border-primary-light select-none outline-none m-2 study-item';

const StudyItem = ({
  date,
  description,
  numInstances,
  modalities,
  trackedSeries,
  isActive,
  onClick,
  thumbnails,
  idx,
  activeIndex,
  activeDisplaySetInstanceUIDs,
  onThumbnailClick,
  onThumbnailDoubleClick,
  onClickUntrack,
}) => {
  const renderThumbnails = () => {
    return thumbnails.map((el, idx) => {
      const { imageSrc } = el;
      if (idx < 3)
        return (
          <img
            style={{
              width: '60px',
              height: 'auto',
              padding: '8px 0 8px 0',
              cursor: 'default',
            }}
            src={imageSrc}
          ></img>
        );
    });
  };

  const convertDate = date => {
    const dateArray = date.split('-');
    const day = dateArray[0];
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ].indexOf(dateArray[1]);
    const year = dateArray[2];

    const newDate = new Date(year, month, day);

    const result =
      newDate.getFullYear().toString() +
      (newDate.getMonth() + 1).toString().padStart(2, '0') +
      newDate
        .getDate()
        .toString()
        .padStart(2, '0');

    return result;
  };

  const lightColors = ['#D9D9D9', '#FBC400'];

  const renderColoredStudies = () => {
    return (
      <div
        className={classnames('bg-black ', baseClasses)}
        role="button"
        tabIndex="0"
      >
        <div
          onClick={onClick}
          onKeyDown={onClick}
          style={{
            width: '100%',
            background: paletteColors[idx],
            // isActive && idx === activeIndex ? '#4071CA' : paletteColors[idx],
            color: lightColors.includes(paletteColors[idx]) ? 'black' : 'white',
            padding: '5px 7px 5px 7px',
            wordBreak: 'break-word',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              {modalities + ' '}
              {description + ' '}
              {convertDate(date)}
            </span>
            <IconDown
              style={{
                width: '13px',
                height: 'auto',
                marginLeft: 'auto',
                marginTop: '5px',
              }}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {renderThumbnails()}
          </div>
        </div>
        {!!trackedSeries && (
          <div className="flex flex-2">
            <div
              className={classnames(
                'flex flex-row bg-secondary-main text-base text-white py-1 pl-2 pr-4 mt-2 ',
                isActive
                  ? 'flex-1 border-t border-secondary-light justify-center'
                  : 'rounded-sm mx-4 mb-4'
              )}
            >
              <Icon name="tracked" className="w-4 mr-2 text-primary-light" />
              {trackedSeries} Tracked Series
            </div>
          </div>
        )}
        {idx === activeIndex && isActive && thumbnails && (
          <ThumbnailList
            thumbnails={thumbnails}
            activeDisplaySetInstanceUIDs={activeDisplaySetInstanceUIDs}
            onThumbnailClick={onThumbnailClick}
            onThumbnailDoubleClick={onThumbnailDoubleClick}
            onClickUntrack={onClickUntrack}
            idx={idx}
          />
        )}
      </div>
    );
  };

  return renderColoredStudies();
};

StudyItem.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  modalities: PropTypes.string.isRequired,
  numInstances: PropTypes.number.isRequired,
  trackedSeries: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default StudyItem;
