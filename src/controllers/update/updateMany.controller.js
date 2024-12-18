const updateMany = async (req, res) => {
  const newData = req?.body
  const queryParams = req?.query
  const selectedModel = req.selectedModel
  let updatedDBDocument = null
  try {
    updatedDBDocument = await selectedModel.updateMany({ [queryParams?.key]: queryParams?.value }, newData, { new: true })
    console.log('updatedDBDocument', updatedDBDocument)
  } catch (error) {
    res.status(404).json(error.message)
  }
  res.status(204).send()
}

export default updateMany