const getContent = <T>(code: T): string => {
  let res: any
  if (typeof code !== "string") {
    res = `${String(code)} Server is Running`
  } else {
    res = `${code} Server is Running`
  }
  return res
}

export { getContent }
