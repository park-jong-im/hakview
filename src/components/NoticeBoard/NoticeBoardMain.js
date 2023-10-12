// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Pagination from "@mui/material/Pagination";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import { Link } from "react-router-dom";
// import NoticeBoardForm from "./NoticeBoardForm";
// import Footer from "../../Footer";
// import Header from "../../Header";
// import { freeboard_api } from "../../api";

// function NoticBoardMain() {
//   const [rows, setRows] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // 페이지 변경 시 데이터 업데이트
//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//     setRows(rows);
//   };

//   useEffect(() => {
//     // 페이지가 로드될 때 API를 호출하여 데이터를 가져옵니다.
//     const fetchData = async () => {
//       try {
//         const freeboardList = await freeboard_api.list(page);
//         console.log(freeboardList);
//         // API 데이터를 initialRows 배열의 형식으로 변환합니다.
//         const formattedData = freeboardList.content.map((item) => ({
//           serial: item.freeboardSerial,
//           title: item.freeboardTitle,
//           nickname: item.ac_userNickname,
//           date: item.createdAt.split(" ")[0],
//         }));

//         setTotalPages(freeboardList.totalPages);

//         setRows(formattedData); // 변환한 데이터를 rows 상태에 설정합니다.
//       } catch (error) {
//         console.error("에러:", error);
//       }
//     };

//     fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
//   }, [page]);

//   return (
//     <>
//       <Header />
//       <div
//         style={{
//           border: "1px solid #ccc",
//           width: "900px",
//           borderRadius: "10px",
//           margin: "80px auto",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             marginTop: "50px",
//             marginBottom: "40px",
//           }}
//         >
//           자유 게시판
//         </h2>
//         <TableContainer component={Paper} sx={{ width: 800, margin: "0 auto" }}>
//           <Table
//             sx={{ maxWidth: 800, margin: "5px auto" }}
//             aria-label="simple table"
//           >
//             <TableHead
//               sx={{
//                 backgroundImage:
//                   "linear-gradient(45deg, rgba(147, 112, 219, 0.5) 40%, rgba(2, 136, 209, 0.5) 90%)",
//                 color: "white",
//                 fontSize: "15px",
//                 width: "auto",
//               }}
//             >
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", color: "#673ab7" }}
//                 >
//                   번호
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", color: "#673ab7" }}
//                 >
//                   제목
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", color: "#673ab7" }}
//                 >
//                   작성자
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", color: "#673ab7" }}
//                 >
//                   날짜
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", color: "#673ab7" }}
//                 >
//                   조회
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: "bold", color: "#673ab7" }}
//                 >
//                   추천
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <TableRow
//                   key={row.serial}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <TableCell align="center" component="th" scope="row">
//                     {row.serial}
//                   </TableCell>
//                   <TableCell align="left">
//                     <Link to={`/NoticeBoardForm/${row.serial}`}>
//                       {row.title}
//                     </Link>
//                   </TableCell>
//                   <TableCell align="center">{row.nickname}</TableCell>
//                   <TableCell align="center">{row.date}</TableCell>
//                   <TableCell align="center">11</TableCell>
//                   <TableCell align="center">11</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//             {/* ... existing code ... */}
//             {selectedItem && (
//               <div>
//                 <NoticeBoardForm item={selectedItem} />
//               </div>
//             )}
//           </Table>
//         </TableContainer>
//         <Grid
//           container
//           spacing={2}
//           alignItems="center"
//           sx={{
//             justifyContent: "center",
//             marginTop: "30px",
//             marginBottom: "30px",
//           }}
//         >
//           <Grid item sx={{ marginLeft: "250px" }}>
//             <Pagination
//               count={totalPages}
//               variant="outlined"
//               color="secondary"
//               page={page}
//               onChange={handlePageChange}
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginLeft: "200px",
//             }}
//           >
//             <Link to="/NoticeBoardWrite">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 className="button"
//                 sx={{
//                   backgroundImage:
//                     "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
//                   color: "white",
//                   fontSize: "15px",
//                   width: "auto",
//                 }}
//               >
//                 글쓰기
//               </Button>
//             </Link>
//           </Grid>
//         </Grid>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default NoticBoardMain;
