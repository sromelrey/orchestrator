import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface TextBoxProps {
  htmlFor: string
  label: string
  classLabel: string
  classInput: string
  isInline?: boolean
  hasError?: boolean
  inputRef?: any
  icon?: React.ReactNode // Accepts any JSX element as an icon
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function TextBox({
  htmlFor,
  label,
  icon,
  classLabel,
  classInput,
  isInline,
  inputRef,
  hasError,
  ...rest
}: TextBoxProps & (InputProps | LabelProps)) {
  return (
    <>
      <label htmlFor={htmlFor} className={classLabel}>
        {label}
      </label>
      {isInline ? (
        <div className="relative">
          <input className={classInput} {...(rest as InputProps)} ref={inputRef} />
          {icon && <>{icon}</>}
        </div>
      ) : (
        <>
          <input className={classInput} {...(rest as InputProps)} ref={inputRef} />
          {icon && <>{icon}</>}
        </>
      )}
      {hasError && (
        <div className="relative flex flex-row row-span-2 gap-2 pt-2">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Test Error Message</p>
        </div>
      )}
    </>
  )
}
