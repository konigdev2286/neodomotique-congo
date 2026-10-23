import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  erreur?: string;
  aide?: string;
}

export function Input({
  label,
  erreur,
  aide,
  id,
  className = "",
  disabled,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="font-titre text-xs uppercase tracking-accroche text-ivoire flex justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-or text-[11px]">* Requis</span>}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        className={`h-11 w-full bg-noir-900 px-4 font-texte text-sm text-ivoire placeholder:text-ivoire-800 border transition-colors rounded-none focus-visible:outline-none focus-visible:ring-1 ${
          erreur
            ? "border-red-500/80 focus-visible:border-red-400 focus-visible:ring-red-400"
            : "border-noir-700 hover:border-noir-600 focus-visible:border-or focus-visible:ring-or"
        } ${disabled ? "bg-noir-950 text-ivoire-800 border-noir-800 cursor-not-allowed" : ""} ${className}`}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? `${inputId}-error` : aide ? `${inputId}-aide` : undefined}
        {...props}
      />
      {erreur ? (
        <p id={`${inputId}-error`} className="font-texte text-xs text-red-400 mt-0.5">
          {erreur}
        </p>
      ) : aide ? (
        <p id={`${inputId}-aide`} className="font-texte text-xs text-ivoire-800 mt-0.5">
          {aide}
        </p>
      ) : null}
    </div>
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  erreur?: string;
  aide?: string;
}

export function Textarea({
  label,
  erreur,
  aide,
  id,
  className = "",
  disabled,
  rows = 4,
  ...props
}: TextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-titre text-xs uppercase tracking-accroche text-ivoire flex justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-or text-[11px]">* Requis</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-noir-900 p-4 font-texte text-sm text-ivoire placeholder:text-ivoire-800 border transition-colors rounded-none focus-visible:outline-none focus-visible:ring-1 resize-y ${
          erreur
            ? "border-red-500/80 focus-visible:border-red-400 focus-visible:ring-red-400"
            : "border-noir-700 hover:border-noir-600 focus-visible:border-or focus-visible:ring-or"
        } ${disabled ? "bg-noir-950 text-ivoire-800 border-noir-800 cursor-not-allowed" : ""} ${className}`}
        aria-invalid={!!erreur}
        {...props}
      />
      {erreur ? (
        <p className="font-texte text-xs text-red-400 mt-0.5">{erreur}</p>
      ) : aide ? (
        <p className="font-texte text-xs text-ivoire-800 mt-0.5">{aide}</p>
      ) : null}
    </div>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  erreur?: string;
  aide?: string;
  options: SelectOption[];
}

export function Select({
  label,
  erreur,
  aide,
  options,
  id,
  className = "",
  disabled,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="font-titre text-xs uppercase tracking-accroche text-ivoire flex justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-or text-[11px]">* Requis</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={`h-11 w-full bg-noir-900 px-4 pr-10 font-texte text-sm text-ivoire border transition-colors rounded-none appearance-none focus-visible:outline-none focus-visible:ring-1 ${
            erreur
              ? "border-red-500/80 focus-visible:border-red-400 focus-visible:ring-red-400"
              : "border-noir-700 hover:border-noir-600 focus-visible:border-or focus-visible:ring-or"
          } ${disabled ? "bg-noir-950 text-ivoire-800 border-noir-800 cursor-not-allowed" : ""} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-noir-900 text-ivoire">
              {opt.label}
            </option>
          ))}
        </select>
        {/* Flèche sobre */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ivoire-700">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {erreur ? (
        <p className="font-texte text-xs text-red-400 mt-0.5">{erreur}</p>
      ) : aide ? (
        <p className="font-texte text-xs text-ivoire-800 mt-0.5">{aide}</p>
      ) : null}
    </div>
  );
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export function Checkbox({
  label,
  description,
  id,
  className = "",
  disabled,
  checked,
  ...props
}: CheckboxProps) {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-start gap-3 select-none cursor-pointer group ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          checked={checked}
          className="sr-only peer"
          {...props}
        />
        <div className="h-5 w-5 border border-noir-700 bg-noir-900 peer-checked:bg-or peer-checked:border-or transition-colors group-hover:border-or focus-visible:ring-1 focus-visible:ring-or rounded-none flex items-center justify-center">
          <svg
            className="h-3.5 w-3.5 text-noir opacity-0 peer-checked:opacity-100 transition-opacity stroke-[2.5]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-texte text-sm text-ivoire group-hover:text-or transition-colors">
          {label}
        </span>
        {description && (
          <span className="font-texte text-xs text-ivoire-700 mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}
