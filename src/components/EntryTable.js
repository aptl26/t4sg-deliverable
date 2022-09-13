import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import EntryModal from './EntryModal';
import { getCategory, categories } from '../utils/categories';
import { useState } from 'react'
// Table component that displays entries on home screen

export default function EntryTable({ entries, user }) {
   const [search, setSearch]  = useState("")
   const [filter, setFilter] = useState(false)
   const [userSearch, setUserSearch] = useState("Default")
   const [category, setCategory] = useState(0);

    let entriesFiltered = entries.filter(entry => 
      entry.name.startsWith(search) &&
      (userSearch === "Default" ? true : entry.user === userSearch) &&
      (category === "Default" ? true : entry.category === category))
    let s = new Set()

   const handleSearchChange  = (event) => {
         setSearch(event.target.value)
      }
   const showFilter = (filter) => {
      if (filter) {
         return(
            <div>
               <FormControl sx={{ "margin-top": 10, width: 200}}>
                  <InputLabel id="demo-simple-select-label">User</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={userSearch}
                     label="User"
                     onChange={(event) => setUserSearch(event.target.value)}
                  >
                     {entries.filter((entry) => {
                        if (s.has(entry.user)) {
                           return(false)
                        }
                        else {
                           s.add(entry.user)
                           return true
                        }}).map((entry) =>
                           (<MenuItem key={entry.userid} value={entry.user}>
                                 {entry.user}
                           </MenuItem>))}
                  </Select>
               </FormControl>
               <FormControl sx={{ "margin-left": 20, "margin-top": 10, "margin-bottom": 10, width: 200}}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={(event) => setCategory(event.target.value)}
                  >
                     {categories.map((category) =>
                        (<MenuItem value={category.id} key={category.id}>
                           {category.name}
                         </MenuItem>))}
                  </Select>
               </FormControl>
         </div>
         )
      }
   }
   return (
      <>
         <Button onClick={() => setFilter(!filter)}
               sx={{ "margin-top": 13 }}
               variant="contained">Filter</Button>
         <TextField
         id="search"
         label="Search"
         variant="standard"
         value={search}
         onChange={handleSearchChange}
         sx={{ width: 400, "margin-bottom": 10, "margin-left": 20 }}
         />

         {showFilter(filter)}
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Link</TableCell>
                     <TableCell align="right">User</TableCell>
                     <TableCell align="right">Category</TableCell>
                     <TableCell align="right">Open</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {entriesFiltered.map((entry) => (
                     <TableRow
                        key={entry.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {entry.name}
                        </TableCell>
                        <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                        <TableCell align="right">{entry.user}</TableCell>
                        <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                        <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                           <EntryModal entry={entry} type="edit" user={user}/>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
}
