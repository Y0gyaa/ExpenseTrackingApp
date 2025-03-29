import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Box, Toolbar } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Sidebar = () => {
  const [openExpenses, setOpenExpenses] = useState(true);
  const [openIncome, setOpenIncome] = useState(true);

  return (
    <Drawer variant="permanent" sx={{ width: 250, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box", zIndex: -1 } }}>
      <Toolbar sx={{zIndex:-1}} />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {/* Expenses Menu */}
          <ListItemButton onClick={() => setOpenExpenses(!openExpenses)}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
            {openExpenses ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Expense Sub-Options */}
          <Collapse in={openExpenses} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View Expenses" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="New Expense" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Expense" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Expense" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload CSV" />
              </ListItemButton>

              
            </List>
          </Collapse>

          {/* Income Menu */}
          <ListItemButton onClick={() => setOpenIncome(!openIncome)}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Income" />
            {openIncome ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Income Sub-Options */}
          <Collapse in={openIncome} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View Income" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="New Income" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Income" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Income" />
              </ListItemButton>

             
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Budget" />

          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
