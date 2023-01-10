export const isNil = (val: any): boolean => val === undefined || val === null

export const getBoolVal = (val?: string|boolean|null): boolean => {
  if (typeof val === 'string') {
    return val === 'true'
  }

  return !!val
}
