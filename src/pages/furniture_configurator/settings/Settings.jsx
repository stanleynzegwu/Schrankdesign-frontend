/* eslint-disable react/jsx-key */
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout"
import Layout from "../../../Layouts/FurnitureConfigurator/Layout"

import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Close"
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid"
import { randomId } from "@mui/x-data-grid-generator"
import {
  getAllSettings,
  updateSettingVariable,
} from "../../../Functions-configurator/Function-configurator"
import toast from "react-hot-toast"

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = randomId()
    setRows((oldRows) => [...oldRows, { id, name: "", type: "default", unit: "percent", isNew: true }])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}

const tabs = [
  {
    to: "/dashboard/furniture-configurator/settings",
    label: "Settings",
  },
]

export default function Settings() {
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})

  useEffect(() => {
    const getSettingInfo = async () => {
      const { data } = await getAllSettings()
      const result = data.data.map((element) => {
        return { id: randomId(), ...element }
      })
      setRows(result)
    }
    getSettingInfo()
  }, [])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => () => {
    // const {_id} = rows.find(row => row.id === id)

    // setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow) => {
    const updateSelectedRow = async () => {
      const { res, error } = await updateSettingVariable(newRow)

      if (res) {
        toast.success(res?.message)
        return true
      } else {
        toast.error(error?.message)
        return false
      }
    }
    updateSelectedRow()
    const updatedRow = { ...newRow, isNew: false }

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "type",
      headerName: "Type",
      type: "singleSelect",
      valueOptions: ["default", "Time Cost/h", "Prepare Time", "Needed Time"],
      width: 180,
      editable: true,
    },
    {
      field: "value",
      headerName: "Value",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["percent", "euro", "min"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]
  return (
    <Layout>
      <SubLayout tabs={tabs}>
        <div className="w-full flex flex-row mb-[20px]">
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar: EditToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
          </Box>
        </div>
      </SubLayout>
    </Layout>
  )
}
