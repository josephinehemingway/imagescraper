import styled from 'styled-components'
import {
  Row,
  InputNumber,
  Select,
  Col,
  Input,
} from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons';

export const StyledInput = styled(Input)`
  && {
    width: 100%;
    border-radius: 5px;
  }
`

export const CheckboxUnselected = styled(CheckCircleOutlined)`
  && {
    font-size: 35px;
    color: white;
    opacity: 0;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`

export const StyledRow = styled(Row)`
  && {
    width: ${(props) => (props.margin ? props.margin : '100%')};
    margin-bottom:  ${(props) => (props.marginbottom ? props.marginbottom : '20px')};
    margin-right: ${(props) => (props.margin ? props.margin : '20px')};
  }
`

export const RowContainer = styled(Row)`
&& {
  display: flex;
  align-items: ${(props) => (props.alignitems ? props.alignitems : 'flex-start')};;
  justify-content:  ${(props) => (props.justifycontent ? props.justifycontent : 'flex-start')};
  flex-direction: row;
  width: ${(props) => (props.margin ? props.margin : '100%')};
  margin-bottom:  ${(props) => (props.marginbottom ? props.marginbottom : '20px')};
  margin-right: ${(props) => (props.marginright ? props.marginright : '20px')};
  margin-left: ${(props) => (props.marginleft ? props.marginleft : '0px')};
  margin-top: ${(props) => (props.margintop ? props.margintop : '0px')};
}
`

export const StyledInputNumber = styled(InputNumber)`
  && {
    width: 100%;
    border-radius: 5px;
  }
`

export const StyledSelect = styled(Select)`
  && {
    width: ${(props) => (props.width ? props.width : '100%')};
    & .ant-select-selector {
      border-radius: 5px;
    }
  }
`

export const ContentContainer = styled(Col)`
  && {
    padding: ${(props) => (props.padding ? props.padding : '10px')};
    width: ${(props) => (props.width ? props.width : '100%')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ${(props) => (props.alignitems ? props.alignitems : 'flex-start')};
  }
`

export const SearchBar = styled(Input.Search)`
&& {
 
    border-radius: 25px;
    height: 50px;

  & .ant-input-search .ant-input-lg {
    margin-left: 10px;
  }

  & .ant-input-group > .ant-input-affix-wrapper {
    box-shadow: 0 3px 3px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
    border-radius: 25px;
    height: 50px;
  }

  &.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button {
    box-shadow: 0 3px 3px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
    height: 50px;
    width: 50px;
    border-radius: 30px;
    margin-left: 10px;
  }

  & .ant-input-search .ant-input-group .ant-input-affix-wrapper:not(:last-child){
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    height: 50px;
  }

  & .ant-input-group-addon {
    background: rgba(0,0,0,0);
  }

}
`
