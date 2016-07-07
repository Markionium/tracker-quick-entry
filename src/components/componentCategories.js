import React from 'react';

// material-ui
import TextField from 'material-ui/lib/TextField';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Toggle from 'material-ui/lib/toggle';
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import Create from 'material-ui/lib/svg-icons/content/create';
import Error from 'material-ui/lib/svg-icons/alert/error';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import ButtonWrapper from './button-wrapper';
import FontIcon from 'material-ui/lib/font-icon';

import { isRequired } from 'd2-ui/lib/forms/Validators';
//App
import HackyDropdown from './drop-down';

var dateFormat = function formatDate(date) {
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
}

//TODO The data types are : TEXT, DATE, NUMBER, EMAIL, PHONE NUMBER, BOOLEAN, BOOLEAN
export default function getComponent(cell,hc) {
    let component= {};



    const fieldBase = {
                    name: cell.id,
                    component: TextField,
                    props: {
                        style: { width: '100%',height:50,marginTop:-40},
                        defaultValue:'',
                        key: cell.id,
                        errorStyle: {position:'absolute',top:-2,height:0,paddingBottom:5},
                    }
                };
    switch (cell.type) {
        case 'DATE':
            component = Object.assign({}, fieldBase, {
                        component: DatePicker,
                        props: Object.assign({}, fieldBase.props, {
                            onChange: hc,
                            autoOk : true,
                            formatDate: dateFormat,
                            textFieldStyle:{width:'100%'}
                        }),
                    });
            break;
        case 'NUMBER':
            component = Object.assign({}, fieldBase, {
                        component: TextField,
                        changeEvent: 'onBlur',
                        props: Object.assign({}, fieldBase.props, {
                            onBlur: hc,
                            type:'number'
                        }),
                    });
            break;
        case 'TEXT':
            component = Object.assign({}, fieldBase, {
                        component: TextField,
                        changeEvent: 'onBlur',
                        props: Object.assign({}, fieldBase.props, {
                            onBlur: hc
                        }),
                    });
            break;
        case 'optionSet':
            component = Object.assign({}, fieldBase, {
                        component: HackyDropdown,
                        changeEvent: 'onChange',
                        props: Object.assign({}, fieldBase.props, {
                            value:'dropValue',
                            onChange: hc,
                            menuItems: cell.options,
                            includeEmpty: true,
                            emptyLabel: 'Select Program'
                        }),
                    });
            break;
        case 'BOOLEAN':
            component = Object.assign({}, fieldBase, {
                        component: Toggle,
                        props: Object.assign({}, fieldBase.props, {
                            onToggle: hc
                        })
                    });
            break;
        case 'icon':
            component = Object.assign({}, fieldBase, {
                        component: IconButton,
                        displayName:'icon'
                    });
            break;
        case 'button':
            component = Object.assign({}, fieldBase, {
                        displayName: 'button',
                        component: ButtonWrapper,
                        props : {
                            primary: true,
                            validating:false,
                        }
                    });
            break;

        default:
            component = Object.assign({}, fieldBase, {
                        component: TextField,
                        changeEvent: 'onBlur',
                        props: Object.assign({}, fieldBase.props, {
                            onBlur: hc
                        }),
                    });
    }
    return component;

}
