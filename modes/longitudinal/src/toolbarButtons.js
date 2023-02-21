// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l
import {
  // ExpandableToolbarButton,
  // ListMenu,
  WindowLevelMenuItem,
} from '@ohif/ui';
import { defaults } from '@ohif/core';

const { windowLevelPresets } = defaults;
/**
 *
 * @param {*} type - 'tool' | 'action' | 'toggle'
 * @param {*} id
 * @param {*} icon
 * @param {*} label
 */
function _createButton(type, id, icon, label, commands, tooltip, uiType) {
  return {
    id,
    icon,
    label,
    type,
    commands,
    tooltip,
    uiType,
  };
}

function _createCommands(commandName, toolName, toolGroupIds) {
  return toolGroupIds.map(toolGroupId => ({
    /* It's a command that is being run when the button is clicked. */
    commandName,
    commandOptions: {
      toolName,
      toolGroupId,
    },
    context: 'CORNERSTONE',
  }));
}

const _createActionButton = _createButton.bind(null, 'action');
const _createToggleButton = _createButton.bind(null, 'toggle');
const _createToolButton = _createButton.bind(null, 'tool');

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    type: 'action',
    commands: [
      {
        commandName: 'setWindowLevel',
        commandOptions: {
          ...windowLevelPresets[preset],
        },
        context: 'CORNERSTONE',
      },
    ],
  };
}

const toolbarButtons = [
  // Measurement
  {
    id: 'MeasurementTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'MeasurementTools',
      isRadio: true, // ?
      // Switch?
      primary: _createToolButton(
        'Length',
        'tool-length',
        'Length',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'Length',
            },
            context: 'CORNERSTONE',
          },
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'SRLength',
              toolGroupId: 'SRToolGroup',
            },
            // we can use the setToolActive command for this from Cornerstone commandsModule
            context: 'CORNERSTONE',
          },
        ],
        'Length'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Measure Tools',
      },
      items: [
        _createToolButton(
          'Length',
          'tool-length',
          'Length',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Length',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRLength',
                toolGroupId: 'SRToolGroup',
              },
              // we can use the setToolActive command for this from Cornerstone commandsModule
              context: 'CORNERSTONE',
            },
          ],
          'Length Tool'
        ),
        _createToolButton(
          'Bidirectional',
          'tool-bidirectional',
          'Bidirectional',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Bidirectional',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRBidirectional',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Bidirectional Tool'
        ),
        _createToolButton(
          'ArrowAnnotate',
          'tool-annotate',
          'Annotation',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ArrowAnnotate',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRArrowAnnotate',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Arrow Annotate'
        ),
        _createToolButton(
          'EllipticalROI',
          'tool-elipse',
          'Ellipse',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'EllipticalROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SREllipticalROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Ellipse Tool'
        ),
      ],
    },
  },
  // Zoom..
  {
    id: 'Zoom',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Zoom',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Window Level + Presets...
  {
    id: 'WindowLevel',
    type: 'ohif.splitButton',
    props: {
      groupId: 'WindowLevel',
      primary: _createToolButton(
        'WindowLevel',
        'tool-window-level',
        'Window Level',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'WindowLevel',
            },
            context: 'CORNERSTONE',
          },
        ],
        'Window Level'
      ),
      secondary: {
        icon: 'chevron-down',
        label: 'W/L Manual',
        isActive: true,
        tooltip: 'W/L Presets',
      },
      isAction: true, // ?
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(1, 'Soft tissue', '400 / 40'),
        _createWwwcPreset(2, 'Lung', '1500 / -600'),
        _createWwwcPreset(3, 'Liver', '150 / 90'),
        _createWwwcPreset(4, 'Bone', '2500 / 480'),
        _createWwwcPreset(5, 'Brain', '80 / 40'),
      ],
    },
  },
  // Pan...
  {
    id: 'Pan',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-move',
      label: 'Pan',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Pan',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Capture',
    type: 'ohif.action',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      type: 'action',
      commands: [
        {
          commandName: 'showDownloadViewportModal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Layout',
    type: 'ohif.layoutSelector',
    props: {
      rows: 3,
      columns: 3,
    },
  },
  {
    id: 'MPR',
    type: 'ohif.action',
    props: {
      type: 'toggle',
      icon: 'icon-mpr',
      label: 'MPR',
      commands: [
        {
          commandName: 'toggleMPR',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Crosshairs',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolGroupId: 'mpr',
            toolName: 'Crosshairs',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Reset',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-reset',
      label: 'Reset View',
      commands: [
        {
          commandName: 'resetViewport',
          commandOptions: {
            toolName: 'Reset View',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Invert',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-invert',
      label: 'Invert',
      commands: [
        {
          commandName: 'invertViewport',
          commandOptions: {
            toolName: 'Invert',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Rotate',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-rotate-right',
      label: 'Rotate',
      commands: [
        {
          commandName: 'rotateViewportCW',
          commandOptions: {
            toolName: 'Rotate',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'flip-horizontal',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-flip-horizontal',
      label: 'Flip horizontal',
      commands: [
        {
          commandName: 'flipViewportHorizontal',
          commandOptions: {
            toolName: 'Flip horizontal',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'StackImageSync',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'link',
      label: 'Stack Image Sync',
      commands: [
        {
          commandName: 'toggleStackImageSync',
          commandOptions: {
            toolName: 'Stack Image Sync',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ReferenceLines',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-referenceLines',
      label: 'Reference Lines',
      commands: [
        {
          commandName: 'toggleReferenceLines',
          commandOptions: {
            toolName: 'Reference Lines',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'StackScroll',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-probe',
      label: 'Probe',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Probe',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Probe',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-stack-scroll',
      label: 'Stack Scroll',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Stack Scroll',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Angle',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-angle',
      label: 'Angle',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Angle',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'cine',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-cine',
      label: 'Cine',
      commands: [
        {
          commandName: 'toggleCine',
          commandOptions: {
            toolName: 'Cine',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  {
    id: 'Magnify',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-magnify',
      label: 'Magnify',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Magnify',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  {
    id: 'Rectangle',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-rectangle',
      label: 'Rectangle',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'RectangleROI',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'TagBrowser',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'list-bullets',
      label: 'Dicom Tag Browser',
      commands: [
        {
          commandName: 'openDICOMTagViewer',
          commandOptions: {
            toolName: 'RectangleROI',
          },
          context: 'DEFAULT',
        },
      ],
    },
  },

  // More...
];

export default toolbarButtons;
