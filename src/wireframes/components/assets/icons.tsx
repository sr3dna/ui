import { Input } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import './icons.scss';

import { Grid, MathHelper } from '@app/core';

import {
    addIcon,
    AssetsState,
    Diagram,
    EditorState,
    filterIcons,
    getSelection,
    IconInfo,
    UndoableState
} from '@app/wireframes/model';

import { Icon } from './icon';

interface IconsProps {
    // The filtered icons.
    iconsFiltered: IconInfo[];

    // The icons filter.
    iconsFilter: string;

    // The selected diagram.
    selectedDiagram: Diagram | null;

    // Filter the icons.
    filterIcons: (value: string) => any;

    // Adds an Icon.
    addIconToPosition: (diagram: Diagram, char: string) => any;
}

const addIconToPosition = (diagram: Diagram, char: string) => {
    return addIcon(diagram, char, 100, 100, MathHelper.guid());
};

const mapStateToProps = (state: { assets: AssetsState, editor: UndoableState<EditorState> }) => {
    const { diagram } = getSelection(state);

    return {
        selectedDiagram: diagram,
        iconsFiltered: state.assets.iconsFiltered,
        iconsFilter: state.assets.iconsFilter
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
    filterIcons, addIconToPosition
}, dispatch);

const Icons = (props: IconsProps) => {
    const cellRenderer = (icon: IconInfo) => {
        const doAdd = () => {
            if (props.selectedDiagram) {
                props.addIconToPosition(props.selectedDiagram, icon.text);
            }
        };

        return (
            <div className='asset-icon'>
                <div className='asset-icon-preview' onDoubleClick={doAdd}>
                    <Icon icon={icon} />
                </div>

                <div className='asset-icon-title'>{icon.label}</div>
            </div>
        );
    };

    return (
        <>
            <div className='asset-icons-search'>
                <Input placeholder='Find icon' value={props.iconsFilter} onChange={event => props.filterIcons(event.target.value)} />
            </div>

            <Grid className='asset-icons-list' renderer={cellRenderer} columns={2} items={props.iconsFiltered} keyBuilder={icon => icon.name} />
        </>
    );
};

export const IconsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Icons);