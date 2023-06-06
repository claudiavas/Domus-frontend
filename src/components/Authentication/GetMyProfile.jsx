//   const [profile, setProfile] = useState({})
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     getMyProfile() 
//   }, [])

//   const getMyProfile = async () => {
//   setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8000/me", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
//       console.log("response", response)
//       setProfile(response.data)
//     } catch (error) {
//       console.log("error", error)
//       setError(error.response.data.error.result);
//       setTimeout(() => {
//         setError("");
//       },5000)
//     }
//     setLoading(false);
//   }

