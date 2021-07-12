import { lazy } from 'react'

import {
  Main,
  Section,
  Container,
  Row,
  Col,
  View,
  Text,
  Input,
  Title,
  Desc,
  Button,
  AuthForm,
  Quantity,
  Image,
  InputGroup, 
  Label, 
  Span, 
  Error, 
  ErrorMessage, 
  StyledCheckBox,
  RTEContent
} from './core'

export * from './core'
export * from './constant'
export * from './Loading'

// banner
const PageBanner = lazy(() => import('./banner/PageBanner'))

// promotion card
const PromotionCard = lazy(() => import('./card/promotioncard'))

// product card
const ProductCard = lazy(() => import('./card/productcard'))

// product card
const CategoryCard = lazy(() => import('./card/categorycard'))

// service card
const ServiceCard = lazy(() => import('./card/servicecard'))

// modal
const Modal = lazy(() => import('./modal/modal'))

// product slider
const ProductSlider = lazy(() => import('./slider/productslider'))

// breadcrumb
const Breadcrumb = lazy(() => import('./breadcrumb'))

// sidebar
const ProductSidebar = lazy(() => import('./sidebar/productsidebar'))
const Sidebar = lazy(() => import('./sidebar/sidebar'))

// table
const TableCom = lazy(() => import('./table'))

// form
const TextInput = lazy(() => import('./form/input'))
const Select = lazy(() => import('./form/select'))
const TextArea = lazy(() => import('./form/textarea'))
const CheckBox = lazy(() => import('./form/checkbox'))
const DatePickerField = lazy(() => import('./form/datepicker'))
const SelectDateField = lazy(() => import('./form/selectdatepicker'))
const FileUpload = lazy(() => import('./form/upload'))

// info
const Support = lazy(() => import('./info'))

// result
const SuccessMsg = lazy(() => import('./result/SuccessMsg'))
const NoResult = lazy(() => import('./result/NoResult'))

// Ads
const Advertisement = lazy(() => import('./ads'))

// service
const ServiceForm = lazy(() => import('./service/ServiceForm'))
const Confirmation = lazy(() => import('./service/Confirmation'))

// pagination
const Pagination = lazy(() => import('./pagination'))

const Components = {
  PageBanner,
  Modal,
  PromotionCard,
  ProductCard,
  ProductSlider,
  CategoryCard,
  ServiceCard,
  Breadcrumb,
  Sidebar,
  ProductSidebar,
  TableCom,
  TextInput,
  Select,
  TextArea,
  CheckBox,
  FileUpload,
  DatePickerField,
  SelectDateField,
  Support,
  SuccessMsg,
  NoResult,
  Advertisement,
  ServiceForm,
  Confirmation,

  // grid
  Main, 
  Section, 
  Container, 
  Row, 
  Col,
  View,
  Text,
  Title,
  Desc,
  Button,
  AuthForm,
  Quantity,
  Image,
  InputGroup,
  Input,
  Label, 
  Span, 
  Error, 
  ErrorMessage, 
  StyledCheckBox,
  RTEContent,
  Pagination
}

export default Components
