declare module 'react-simple-tooltip' {
  interface IProps {
    content: string
  }

  const Tooltip: React.ComponentType<IProps>
  export default Tooltip
}

declare module 'react-input-range/src/js/input-range/default-class-names' {
  const defaultClassNames: InputRangeClassNames
  export default defaultClassNames
}
