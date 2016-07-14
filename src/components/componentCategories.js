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
import FlatButton from 'material-ui/lib/flat-button';
import ButtonWrapper from './button-wrapper';
import FontIcon from 'material-ui/lib/font-icon';

import { isRequired } from 'd2-ui/lib/forms/Validators';
//App
import HackyDropdown from './drop-down';
import FileUpload from './file-upload';

var dateFormat = function formatDate(date) {
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
}

var tabController = function(e){
    if((e.nativeEvent.target.getBoundingClientRect().right+200)>document.documentElement.clientWidth){
        document.getElementsByClassName('scroll-basic')[0].firstChild.scrollLeft+=200;
    }
}

//TODO The data types are : TEXT, DATE, NUMBER, EMAIL, PHONE NUMBER, BOOLEAN, BOOLEAN
export default function getComponent(cell,hc) {
    let component= {};
    const fieldBase = {
                    name: cell.id,
                    component: TextField,
                    props: {
                        style: {
                            width: '152',
                            marginRight:24,
                            marginLeft:24,
                            height:50,
                            marginTop:-40
                        },
                        defaultValue:'',
                        key: cell.id,
                        errorStyle: {
                            position:'absolute',
                            top:-2,
                            height:0,
                            paddingBottom:5
                        },
                        onFocus: tabController,
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
                            emptyLabel: 'Select Program',
                            style:{width:200}
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
                            style:{width:0,paddingLeft:0,paddingRight:0}
                        }
                    });
            break;
        case 'FILE_RESOURCE':
            component = Object.assign({}, fieldBase, {
                    displayName: 'fileResource',
                    component: FileUpload,
                    props : {
                        label: 'upload '+cell.name,
                        onChange: hc
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
