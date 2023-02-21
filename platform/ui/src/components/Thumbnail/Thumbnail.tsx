import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
import { Icon } from '../';
import { StringNumber } from '../../types';

const paletteColorsClasses = [
  'border border-[#F2884C] group-focus:border-[#F2884C] hover:border-[#F2884C]',
  'border border-[#D9D9D9] group-focus:border-[#D9D9D9] hover:border-[#D9D9D9]',
  'border border-[#73B449] group-focus:border-[#73B449] hover:border-[#73B449]',
  'border border-[#FBC400] group-focus:border-[#FBC400] hover:border-[#FBC400]',
  'border border-[#A5480B] group-focus:border-[#A5480B] hover:border-[#A5480B]',
  'border border-[#5A5CD0] group-focus:border-[#5A5CD0] hover:border-[#5A5CD0]',
  'border border-[#D05A6C] group-focus:border-[#D05A6C] hover:border-[#D05A6C]',
  'border border-[#525B4D] group-focus:border-[#525B4D] hover:border-[#525B4D]',
  'border border-[#08215A] group-focus:border-[#08215A] hover:border-[#08215A]',
];

const activeClasses = [
  'border-2 border-primary-[#F2884C]',
  'border-2 border-primary-[#D9D9D9]',
  'border-2 border-primary-[#73B449]',
  'border-2 border-primary-[#FBC400]',
  'border-2 border-primary-[#A5480B]',
  'border-2 border-primary-[#5A5CD0]',
  'border-2 border-primary-[#D05A6C]',
  'border-2 border-primary-[#525B4D]',
  'border-2 border-primary-[#08215A]',
];

const textClases = [
  'text-[#F2884C]',
  'text-[#D9D9D9]',
  'text-[#73B449]',
  'text-[#FBC400]',
  'text-[#A5480B]',
  'text-[#5A5CD0]',
  'text-[#D05A6C]',
  'text-[#525B4D]',
  'text-[#08215A]',
];

const Thumbnail = ({
  displaySetInstanceUID,
  className,
  imageSrc,
  imageAltText,
  description,
  seriesNumber,
  numInstances,
  dragData,
  isActive,
  onClick,
  idx,
  onDoubleClick,
}) => {
  // TODO: We should wrap our thumbnail to create a "DraggableThumbnail", as
  // this will still allow for "drag", even if there is no drop target for the
  // specified item.
  const [collectedProps, drag, dragPreview] = useDrag({
    type: 'displayset',
    item: { ...dragData },
    canDrag: function(monitor) {
      return Object.keys(dragData).length !== 0;
    },
  });

  return (
    <div
      className={classnames(
        className,
        'flex flex-col flex-1 px-3 mb-8 cursor-pointer outline-none select-none group'
      )}
      id={`thumbnail-${displaySetInstanceUID}`}
      data-cy={`study-browser-thumbnail`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex="0"
    >
      <div ref={drag}>
        <div
          className={classnames(
            'flex flex-1 items-center justify-center rounded-md bg-black text-base text-white overflow-hidden min-h-32',
            isActive ? `${activeClasses[idx]}` : `${paletteColorsClasses[idx]}`
          )}
          style={{
            margin: isActive ? '0' : '1px',
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAltText}
              className="object-none min-h-32"
            />
          ) : (
            <div>{imageAltText}</div>
          )}
        </div>
        <div className="flex flex-row items-center flex-1 pt-2 text-base text-blue-300">
          <div className="mr-4">
            <span className={(classnames('font-bold'), textClases[idx])}>
              {'S: '}
            </span>
            <span className={textClases[idx]}>{seriesNumber}</span>
          </div>
          <div className="flex flex-row items-center flex-1">
            <Icon
              name="group-layers"
              className={(classnames('w-3 mr-2'), textClases[idx])}
              style={{ width: '15px', height: '15px', marginRight: '5px' }}
            />{' '}
            <span className={textClases[idx]}>{numInstances}</span>
          </div>
        </div>
        {/* <div className="text-base text-white break-all">{description}</div> */}
        <div
          style={{ fontSize: '12px' }}
          className={(classnames('text-sm break-all'), textClases[idx])}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

Thumbnail.propTypes = {
  displaySetInstanceUID: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  /**
   * Data the thumbnail should expose to a receiving drop target. Use a matching
   * `dragData.type` to identify which targets can receive this draggable item.
   * If this is not set, drag-n-drop will be disabled for this thumbnail.
   *
   * Ref: https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members
   */
  dragData: PropTypes.shape({
    /** Must match the "type" a dropTarget expects */
    type: PropTypes.string.isRequired,
  }),
  imageAltText: PropTypes.string,
  description: PropTypes.string.isRequired,
  seriesNumber: StringNumber.isRequired,
  numInstances: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

Thumbnail.defaultProps = {
  dragData: {},
};

export default Thumbnail;
