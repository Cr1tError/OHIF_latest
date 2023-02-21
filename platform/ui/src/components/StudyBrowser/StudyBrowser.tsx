import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ButtonGroup, Button, StudyItem, ThumbnailList } from '../';
import { StringNumber } from '../../types';
import { useContext } from 'react';
import { ModalityContext } from '../../contextProviders/ModalityProvider';


const getTrackedSeries = displaySets => {
  let trackedSeries = 0;
  displaySets.forEach(displaySet => {
    if (displaySet.isTracked) {
      trackedSeries++;
    }
  });
  return trackedSeries;
};

const StudyBrowser = ({
  tabs,
  activeTabName,
  expandedStudyInstanceUIDs,
  onClickTab,
  onClickStudy,
  onClickThumbnail,
  onDoubleClickThumbnail,
  onClickUntrack,
  activeDisplaySetInstanceUIDs,
  servicesManager,
}) => {
  const { t } = useTranslation('StudyBrowser');
  const { customizationService } = servicesManager?.services || {};
  const [activeStudy, setActiveStudy] = useState(0); // active by setted index
  const { currentModality, setCurrentModality } = useContext(ModalityContext);

  useEffect(() => {
    onClickTab('all');
  }, []);

  const getTabContent = () => {
    const tabData = tabs.find(tab => tab.name === activeTabName);
    return (
      <div>
        {tabData.studies.map((el, idx) => {
          const {
            studyInstanceUid,
            date,
            description,
            numInstances,
            modalities,
            displaySets,
          } = el;

          const isExpanded = expandedStudyInstanceUIDs.includes(
            studyInstanceUid
          );

          return (
            <React.Fragment key={studyInstanceUid}>
              <StudyItem
                date={date}
                description={description}
                numInstances={numInstances}
                modalities={modalities}
                trackedSeries={getTrackedSeries(displaySets)}
                isActive={isExpanded && activeStudy === idx}
                thumbnails={displaySets}
                idx={idx}
                activeIndex={activeStudy}
                activeDisplaySetInstanceUIDs={activeDisplaySetInstanceUIDs}
                onThumbnailClick={onClickThumbnail}
                onThumbnailDoubleClick={onDoubleClickThumbnail}
                onClickUntrack={onClickUntrack}
                onClick={() => {
                  onClickStudy(studyInstanceUid);
                  setActiveStudy(idx);
                }}
                data-cy="thumbnail-list"
              />
              {displaySets ? setCurrentModality(modalities) : null}
              {/* {idx === activeStudy && isExpanded && displaySets && (
                <ThumbnailList
                  thumbnails={displaySets}
                  activeDisplaySetInstanceUIDs={activeDisplaySetInstanceUIDs}
                  onThumbnailClick={onClickThumbnail}
                  onThumbnailDoubleClick={onDoubleClickThumbnail}
                  onClickUntrack={onClickUntrack}
                />
              )} */}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 overflow-auto">
        {getTabContent()}
      </div>
    </React.Fragment>
  );
};

StudyBrowser.propTypes = {
  onClickTab: PropTypes.func.isRequired,
  onClickStudy: PropTypes.func,
  onClickThumbnail: PropTypes.func,
  onDoubleClickThumbnail: PropTypes.func,
  onClickUntrack: PropTypes.func,
  activeTabName: PropTypes.string.isRequired,
  expandedStudyInstanceUIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeDisplaySetInstanceUIDs: PropTypes.arrayOf(PropTypes.string),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      studies: PropTypes.arrayOf(
        PropTypes.shape({
          studyInstanceUid: PropTypes.string.isRequired,
          date: PropTypes.string,
          numInstances: PropTypes.number,
          modalities: PropTypes.string,
          description: PropTypes.string,
          displaySets: PropTypes.arrayOf(
            PropTypes.shape({
              displaySetInstanceUID: PropTypes.string.isRequired,
              imageSrc: PropTypes.string,
              imageAltText: PropTypes.string,
              seriesDate: PropTypes.string,
              seriesNumber: StringNumber,
              numInstances: PropTypes.number,
              description: PropTypes.string,
              componentType: PropTypes.oneOf([
                'thumbnail',
                'thumbnailTracked',
                'thumbnailNoImage',
              ]).isRequired,
              isTracked: PropTypes.bool,
              viewportIdentificator: PropTypes.arrayOf(PropTypes.string),
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
            })
          ),
        })
      ).isRequired,
    })
  ),
};

const noop = () => {};

StudyBrowser.defaultProps = {
  onClickTab: noop,
  onClickStudy: noop,
  onClickThumbnail: noop,
  onDoubleClickThumbnail: noop,
  onClickUntrack: noop,
};

export default StudyBrowser;
