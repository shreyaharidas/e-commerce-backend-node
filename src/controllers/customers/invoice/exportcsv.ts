// app.get('/api/exportBills', async (req: Request, res: Response) => {
//     try {
//       // Fetch details from the ec_bills table
//       const bills = await EcBills.findAll();
  
//       // Define CSV file content
//       const csvContent = `${Object.keys(bills[0].dataValues).join(',')}\n${bills
//         .map((bill) => Object.values(bill.dataValues).join(','))
//         .join('\n')}`;
  
//       // Write data to CSV file
//       fs.writeFileSync('bills.csv', csvContent);
  
//       res.status(200).json({ success: true, message: 'CSV file created successfully' });
//     } catch (error) {
//       console.error('Error exporting bills:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   // Start the server
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });

export{};