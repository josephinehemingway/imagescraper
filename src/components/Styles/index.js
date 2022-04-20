import styled from 'styled-components'
import {
  Row,
  InputNumber,
  Select,
  Col,
} from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons';


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