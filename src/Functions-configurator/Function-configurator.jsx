import toast from "react-hot-toast"
import { Delete, get, headers, post, put } from "../api/api"
// import { date } from "yup"

// CreatePlates

export const CreatePlates = async (values) => {
  let formdata = new FormData()
  for (const key in values) {
    formdata.append(key, values[key])
  }
  try {
    const data = await post("/api/v1/plates/createplates", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in CreatePlates :", error)
    return { data: null, error: error?.response?.data }
  }
}

// edit plates

export const EditPlates = async (values, id) => {
  let formdata = new FormData()
  for (const key in values) {
    formdata.append(key, values[key])
  }
  try {
    const data = await put(`/api/v1/plates/updateplates/${id}`, formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in EditPlates :", error)
    return { data: null, error: error?.response?.data }
  }
}

// get plates

export const GetallPlates = async () => {
  try {
    const data = await get("/api/v1/plates/getplates")
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallPlates :", error)
    return { data: null, error: error?.response?.data }
  }
}

// delete plate

export const DeltePlate = async (id) => {
  try {
    const data = await Delete(`/api/v1/plates/deleteplates/${id}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in DeletePlate :", error)
    return { data: null, error: error?.response?.data }
  }
}

// platetypes function

// create

export const CreatePlatesTypes = async (values) => {
  let formdata = new FormData()
  for (const key in values) {
    formdata.append(key, values[key])
  }
  try {
    const data = await post("/api/v1/platestypes/createplatesTypes", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in CreatePlatesTypes :", error)
    return { data: null, error: error?.response?.data }
  }
}

// get plattypes

export const GetallPlatesTypes = async () => {
  try {
    const data = await get("/api/v1/platesTypes/getplatesTypes")
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallPlatesTypes :", error)
    return { data: null, error: error?.response?.data }
  }
}

// edit
export const EditPlatesTypes = async (values, id) => {
  let formdata = new FormData()
  for (const key in values) {
    formdata.append(key, values[key])
  }
  try {
    const data = await put(
      `/api/v1/platestypes/updateplatesTypes/${id}`,
      formdata
    )
    return { data, error: null }
  } catch (error) {
    console.error("Error in EditPlatesTypes :", error)
    return { data: null, error: error?.response?.data }
  }
}

// delete

export const DeltePlateTypes = async (id) => {
  try {
    const data = await Delete(`/api/v1/platestypes/deleteplatesTypes/${id}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in DeletePlate :", error)
    return { data: null, error: error?.response?.data }
  }
}

// Edge functions

// create
export const CreateEdge = async (values) => {
  let formdata = new FormData()
  for (const key in values) {
    formdata.append(key, values[key])
  }
  try {
    const data = await post("/api/v1/edges/createEdge", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in CreateEdge :", error)
    return { data: null, error: error?.response?.data }
  }
}

// Get edge

export const GetallEdge = async () => {
  try {
    const data = await get("/api/v1/edges/getEdges")
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallPlates :", error)
    return { data: null, error: error?.response?.data }
  }
}

// update Edge

export const EditEdge = async (values, id) => {
  let formdata = new FormData()
  for (const key in values) {
    formdata.append(key, values[key])
  }
  try {
    const data = await put(`/api/v1/edges/updateEdge/${id}`, formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in EditPlates :", error)
    return { data: null, error: error?.response?.data }
  }
}

// delete Edge

export const DeleteEdge = async (id) => {
  try {
    const data = await Delete(`/api/v1/edges/deleteEdge/${id}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in deleteEdge :", error)
    return { data: null, error: error?.response?.data }
  }
}

// drawer create  and Doors
// Handles
// Feets
// Others
// Fittings

export const CreateDrawer = async (values, url) => {
  let formdata = new FormData()
  for (const key in values) {
      formdata.append(key, values[key])
  }
  try {
    const data = await post(`/api/v1/assests/${url}`, formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in CreateDrawer :", error)
    return { data: null, error: error?.response?.data }
  }
}

// create, update and delete texture
export const CreateTexture = async (formdata) => {
  try {
    const data = await post("/api/v1/texture/CreateTexture", formdata)
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error?.response?.data}
  }
}

export const EditTexture = async (formdata, id) => {
  try {
    const data = await put(`/api/v1/texture/EditTexture/${id}`, formdata)
    return {data, error: null}
  } catch (error) {
    return { data: null, error: error?.response?.data}
  }
}
export const DeleteTexture = async (id) => {
  try {
    const data = await Delete(`/api/v1/texture/DeleteTexture/${id}`)
    return { data, error: null}
  } catch (error) {
    return { date: null, error: error?.response?.data}
  }
}
export const GetallTexture = async () => {
  try {
    const data = await get("/api/v1/texture/getAllTexture")
    return { data, error: null}
  } catch (error) {
    return { data: null, error: error?.response?.data}
  }
}

export const GetSingleTexture = async (id) => {
  try {
    const data = await get(`/api/v1/texture/getSingleTexture/${id}`)
    return { data, error: null}
  } catch (error) {
    return { data: null, error: error?.response?.data}
  }
}

export const AddDrawerList = async (id, formdata, url) => {
  try {
    const data = await post(`/api/v1/assests/${url}/${id}`, formdata)
    return { data, error: null}
  } catch (error) {
    return { data: null, error: error?.response?.data }
  }
}

export const UpdateList = async (id, formdata, url) => {
  try {
    const data = await put(`/api/v1/assests/${url}/${id}`, formdata)
    return { data, error: null}
  } catch (error) {
    return { data: null, error: error?.response?.data }
  }
}

export const DeleteVariation = async (id, index, url) => {
  try {
    const data = await post(`/api/v1/assests/${url}/${id}`, {index: index})
    return { data, error: null}
  } catch(error) {
    return { data: null, error: error?.response?.data }
  }
}
// GetDrawer
// Handles
// Feets
// Others
// Fittings

export const GetallDrawer = async (endpoint) => {
  try {
    const data = await get(`/api/v1/assests/${endpoint}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallDrawer :", error)
    return { data: null, error: error?.response?.data }
  }
}

export const GetTexture = async () => {
  try {
    const data = await get("/api/v1/texture/getTexture")
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error?.response?.data }
  }
}
// upadte drawer
// Handles
// Feets
// Others
// Fittings

export const EditDrawer = async (values, id, url) => {
  let formdata = new FormData()
  for (const key in values) {
        formdata.append(key, values[key])
  }
  try {
    const data = await put(`/api/v1/assests/${url}/${id}`, formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in EditDrawer :", error)
    return { data: null, error: error?.response?.data }
  }
}

// delete drawer
// Handles
// Feets
// Others
// Fittings

export const DeleteDrawer = async (id, url) => {
  try {
    const data = await Delete(`/api/v1/assests/${url}/${id}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in DeleteDrawer :", error)
    return { data: null, error: error?.response?.data }
  }
}

// partlist functions

// partlist getall
export const GetallPArtList = async () => {
  try {
    const data = await get("/api/v1/partlist/getAllPartList")
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallPArtList :", error)
    return { data: null, error: error?.response?.data }
  }
}

// search partlist
export const SearchPartList_ConfigID = async (ConfigID) => {
  let formdata = new FormData()
  formdata.append("configId", ConfigID)
  try {
    const data = await post("/api/v1/partlist/searchByConfigId", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in SearchPartList_ConfigID :", error)
    return { data: null, error: error?.response?.data }
  }
}



// create partlist

export const CreatePartList = async (viewdata, PartListArray) => {
  // console.log(viewdata, "asdsadsa");
  // console.log(PartListArray, "PartListArray");

  let formdata = new FormData()
  formdata.append("config_id", viewdata?.configId)
  if (PartListArray?.length > 0 && Array.isArray(PartListArray)) {
    PartListArray.forEach((part, index) => {
      formdata.append(
        `child_name[${index}]`,
        part?.child_name?.[0] ?? part?.name
      )
      formdata.append(
        `child_config_id[${index}]`,
        part?.child_config_id?.[0] ?? part?.configId
      )
      formdata.append(`images[${index}]`, part?.images ? part?.images : "")
      if (part?.supplier_id) {
        formdata.append(`supplier_id[${index}]`, part?.supplier_id)
      }
      formdata.append(`functions[${index}]`, part?.functions)
      if (
        part?.add_distance?.length > 0 &&
        Array.isArray(part?.add_distance) &&
        part?.functions == "Add-Distance"
      ) {
        part?.add_distance.forEach((functionitems, childindex) => {
          formdata.append(
            `functions_distance[${index}][${childindex}]`,
            functionitems?.functions_distance?.[0] ?? functionitems?.Distance
          )
          formdata.append(
            `functions_from[${index}][${childindex}]`,
            functionitems?.functions_from?.[0] ?? functionitems?.From
          )
          formdata.append(
            `functions_quantity[${index}][${childindex}]`,
            functionitems?.functions_quantity?.[0] ?? functionitems?.Quantity
          )
          formdata.append(
            `functions_to[${index}][${childindex}]`,
            functionitems?.functions_to?.[0] ?? functionitems?.To
          )
        })
      }
      if (part?.functions == "Add-Qty") {
        formdata.append(`qty[${index}]`, part?.quantity ?? part?.qty?.[0])
      }
    })
  }
  try {
    const data = await post("/api/v1/partlist/CreatePartlist", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in CreatePartList :", error)
    return { data: null, error: error?.response?.data }
  }
}

// search test part list

export const SearchTestPartList_ConfigID = async (ConfigID, type) => {
  let formdata = new FormData()
  formdata.append("configId", ConfigID)
  formdata.append("type", type)
  try {
    const data = await post("api/v1/TestpartList/searchConfigId", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in SearchPartList_ConfigID :", error)
    return { data: null, error: error?.response?.data }
  }
}

// Create test partlist

export const CreateTestPartList = async (
  SearchingInput,
  PlateDepth,
  PlateLength,
  MaterialName
) => {
  let formdata = new FormData()
  formdata.append("configId", SearchingInput)
  formdata.append("PlateDepth", PlateDepth)
  formdata.append("PlateLength", PlateLength)
  formdata.append("MaterialName", MaterialName)
  try {
    const data = await post("api/v1/TestpartList/CreateTestPartlist", formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in CreateTestPartList :", error)
    return { data: null, error: error?.response?.data }
  }
}

export const GetallTestPartList = async () => {
  try {
    const data = await get("/api/v1/TestpartList/getAllTestPartLists")
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallTestPartList :", error)
    return { data: null, error: error?.response?.data }
  }
}

// delete test part list

export const DeleteTestPartlist = async (id) => {
  try {
    const data = await Delete(`/api/v1/TestpartList/deleteTestPartlist/${id}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in DeleteTestPartlist :", error)
    return { data: null, error: error?.response?.data }
  }
}

// calculation functions

export const GetallcalculationVeriables = async (route) => {
  try {
    const data = await get(`/api/v1/variables/${route}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in GetallcalculationVeriables :", error)
    return { data: null, error: error?.response?.data }
  }
}

// search config id

export const SearchcalculationVeriables = async (id, route) => {
  let formdata = new FormData()
  formdata.append("configId", id)
  try {
    const data = await post(`/api/v1/variables/${route}`, formdata)
    return { data, error: null }
  } catch (error) {
    console.error("Error in SearchPartList_ConfigID :", error)
    return { data: null, error: error?.response?.data }
  }
}

// delete variable calculation

export const DeleteVariableCalculation = async (id, route) => {
  try {
    const data = await Delete(`/api/v1/variables/${route}/${id}`)
    return { data, error: null }
  } catch (error) {
    console.error("Error in DeleteVariableCalculation :", error)
    return { data: null, error: error?.response?.data }
  }
}

// creat calculation
export const CreateCalculation = async (calculation, route, total) => {
  let formdata = new FormData()
  formdata.append("variable_name", calculation?.variable_name)
  formdata.append("configId", calculation?.config_id)
  formdata.append("test_total", total)
  let shouldContinue = true
  if (
    calculation.material_items.length > 0 &&
    Array.isArray(calculation?.material_items)
  ) {
    calculation?.material_items.map((item, index) => {
      if (!shouldContinue) return
      // Condition 1
      if (
        item?.type === "addnumber" &&
        (!item?.value || item?.value === null || item?.value === undefined)
      ) {
        toast.error("Fill all Fields! .")
        shouldContinue = false
        return
      }
      if (item?.type == "addnumber" || item?.type == "operator") {
        formdata.append(`material_items[${index}][type]`, item?.type)
        formdata.append(`material_items[${index}][value]`, item?.value)
      }
      if (item?.type == "addvariable") {
        if (
          item?.type === "addvariable" &&
          (!item?.variable_name ||
            item?.variable_name === null ||
            item?.variable_name === undefined)
        ) {
          toast.error("Fill all Fields!.")
          shouldContinue = false
          return
        }
        formdata.append(`material_items[${index}][type]`, item?.type)
        formdata.append(
          `material_items[${index}][variable_name]`,
          item?.variable_name
        )
        formdata.append(`material_items[${index}][config_id]`, item?.config_id)
        formdata.append(
          `material_items[${index}][test_result]`,
          item?.test_total || item?.test_result
        )
        item?.VariableType &&
          formdata.append(
            `material_items[${index}][VariableType]`,
            item?.VariableType
          )
      }
      if (item?.type == "addfunction") {
        if (
          item?.type === "addfunction" &&
          (!item?.variable_name ||
            item?.variable_name === null ||
            item?.variable_name === undefined)
        ) {
          toast.error("Fill all Fields!.")
          shouldContinue = false
          return
        }
        formdata.append(`material_items[${index}][type]`, item?.type)
        formdata.append(
          `material_items[${index}][variable_name]`,
          item?.variable_name
        )
        formdata.append(`material_items[${index}][config_id]`, item?.config_id)
        formdata.append(
          `material_items[${index}][test_result]`,
          item?.test_result || item?.test_total
        )
      }
    })
  }
  if (shouldContinue) {
    try {
      // Perform the POST request only if shouldContinue is true
      const data = await post(`/api/v1/variables/${route}`, formdata)
      return { data, error: null }
    } catch (error) {
      console.error("Error in CreateCalculation :", error)
      return { data: null, error: error?.response?.data }
    }
  }
}

// searach materials by config id
const baseUrl = import.meta.env.VITE_BACKEND_URL
export const SearchMaterial_ConfigID = async (ConfigID) => {
  const url = `${baseUrl}/api/v1/variables/searchVariables`
  const payload = {
    configId: ConfigID,
  }
  try {
    const response = await fetch(url, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response?.json()
    return { data, error: null }
  } catch (error) {
    console.error("Error in SearchMaterial_ConfigID :", error)
    return { data: null, error: error?.response?.data }
  }
}

export const SearchFunction_ConfigID = async (ConfigID) => {
  const url = `${baseUrl}/api/v1/variables/searchfuncByConfigId`
  const payload = {
    configId: ConfigID,
  }
  try {
    const response = await fetch(url, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json",
        ...headers(),
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response?.json()
    return { data, error: null }
  } catch (error) {
    console.error("Error in SearchFunction_ConfigID :", error)
    return { data: null, error: error?.response?.data }
  }
}

export const getAllSettings = async () => {
  try {
    const data = await get("/api/v1/settings/getAll")
    return { data, error: null }
  } catch (error) {
    return { data: null, error: error?.response?.data }
  }
}

export const updateSettingVariable = async (data) => {
  // let formdata = new FormData()
  // formdata.append("data", data)
	// console.log(formdata)
  try {
    const res = await post("/api/v1/settings/updateone", data)
    return { res, error: null }
  } catch (error) {
    return { data: null, error: error?.response?.data }
  }
}

export const deleteSettingVariable = async () => {

}