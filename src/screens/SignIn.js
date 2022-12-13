import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import Logo from "../../assets/images/logo.bmp";
  import CustomButton from "../components/CustomButton";
  import CustomInput from "../components/CustomInput";
  import Home from "./Home";
  import ForgotPassword from "./ForgotPassword";
  import { Dimensions } from "react-native";
  import TermsConditions from "./TermsConditions";
  import PrivacyPolicy from "./PrivacyPolicy";
  import { useEffect } from "react";
  import { db } from "../fire";
  import { doc, getDocs, collection} from 'firebase/firestore';
  // import firestore from '@react-native-firebase/firestore';
  //   import { ref, onValue, endAt } from "firebase/database";
  import Loading from "./Loading";
import { getActionFromState } from "@react-navigation/native";
  
  const SignIn = (props) => {
    const [Device_no, SetDeviceno] = useState("");
    // const [ deviceno, setDeviceno] = useState('');
    const [password, setPassword] = useState("");
    const { height } = useWindowDimensions();
    const [test, setTest] = useState([]);
    const [load, setLoad] = useState(false);
    const testCollection = collection(db, "test1");


    useEffect((props) => {
      const getTest = async () => {
        const data = await getDocs(testCollection);
        setTest(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
     
      getTest();
      
      
      // console.log({test});
    }, []);
    
    // const usersCollection = firestore()
    // .collection('test1')
    // .get()
    // .then(collectionSnapshot => {
    //     console.log('Total users: ', collectionSnapshot.size);
    //     collectionSnapshot
    //         .forEach(documentSnapshot => {
    //             console.log('User ID: ', documentSnapshot.id,
    //                 documentSnapshot.data());
    //         });
    // });
  

  const onSignInPressed = () => {
    var flag = false;
    var i;
    for(i=0;i<test.length;i++){     
      if(Device_no===test[i].Device_no  &&  password===test[i].password){
        let c = test[i];
        flag=true;
        setLoad(true);
        props.navigation.navigate("Home", {         
          id: test[i],
        
             

              });
             
             
            
          }
             
  
}
  //  setLoad(false);
   if(flag==false){

    alert("Unsuccessful");
}};


    // const adminCollection = collection(db, "test1");
//     const adminCollection = firestore.collection("test1").get().then(collectionSnapshot => {
//         console.log('Total Users', collectionSnapshot.size);
//         collectionSnapshot.forEach(DocumentSnapshot => {
//         console.log('User ID', DocumentSnapshot.id,
//         DocumentSnapshot.data());
//     });

// });

    // useEffect(() => {
    //     const getAdmins = async () => {
    //       const data = await getDocs(adminCollection);
    //       setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getAdmins();
    //     console.log({admins});
    // }, []);
    // firebase.firestore().collection(db,'test1').get().then((querySnapshot) => {
    //     querySnapshot.forEach(snapshot => {
    //         let data = snapshot.data();
    //         console.log(data);
    //     })
    // })
    
  

  
    // useEffect(() => {
    //   setTimeout(() => setLoad(false), 3000);
    // }, []);
  
    // useEffect(() => {
    //   return onValue(ref(db, `/`), (querySnapShot) => {
    //     let data = querySnapShot.val();
    //     setGas(data);
    //     // console.log(gasRef);
    //     // console.log(gasRef);
    //   });
    // }, []);
  
    // const onSignInPressed = () => {
    // //   var flag = false;
    // //   let gasRef = Object.keys(gas);
    // //   gasRef.forEach((key) => {
    //     if (Device_no == db.Device_no && password == gas[key].password) {
    //       flag = true;
    //       props.navigation.navigate("Home", {
    //         id: gas[key],
    //       });
    //       setLoad(true);
    //       // alert("success");
    //     }
    //   });
    //   if (flag == false) {
    //     alert("Invalid login credentials");
    //   }
    // };
  
    const onForgotPasswordPressed = () => {
      props.navigation.navigate(ForgotPassword);
    };
  
    const onTermsOfUsePressed = () => {
      props.navigation.navigate(TermsConditions);
    };
  
    const onPrivacyPolicyPressed = () => {
      props.navigation.navigate(PrivacyPolicy);
    };
  
    const { wp, hp } = Dimensions.get("window");
  
    return (
        
      <View
        style={{
          height: hp,
          width: wp,
          flex: 1,
        }}
      >
        {/* LOADING */}
        {load ? (
         <Loading />
        ) : (
          <View
            style={{
              backgroundColor: "#FFF",
              alignItems: "center",
              padding: 30,
              flex: 1,
            }}
          >
            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.3},{ marginRight: 50}]}
              resizeMode="contain"
            />
  
            <CustomInput
              placeholder="Enter Your Model Number"
              value={Device_no}
              setvalue={SetDeviceno}
            />
            {/* <CustomInput
         placeholder="Enter Your Device Number" 
         value={deviceno} 
         setvalue={setDeviceno}
         /> */}
            <CustomInput
              placeholder="Enter Your Password"
              value={password}
              setvalue={setPassword}
              secureTextEntry={true}
            />
            <Text>
              By Registering, you confirm that you accept our {""}
              <Text style={{ color: "blue" }} onPress={onTermsOfUsePressed}>
                Terms of Use
              </Text>{" "}
              and {""}
              <Text style={{ color: "blue" }} onPress={onPrivacyPolicyPressed}>
                Privacy Policy.
              </Text>
            </Text>
            <CustomButton
              text="Sign In"
              onPress={onSignInPressed}
              
              bgColor="orange"
              fgColor="black"
            />
            <CustomButton
              text="Forgot Password"
              onPress={onForgotPasswordPressed}
              //type="TERTIARY"
              bgColor="lightgray"
              fgColor="black"
            />
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    logo: {
      marginTop: 70,
      width: "70%",
      maxHeight: 200,
      maxWidth: 300,
      marginLeft: 60,
    },
  });
  
  export default SignIn;