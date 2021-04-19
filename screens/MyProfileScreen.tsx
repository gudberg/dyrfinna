import * as React from "react";
import styled from "styled-components/native";

import { Pet, User } from "../FirestoreModels";
import * as firebase from "firebase";
import {
  mainBackgroundColor,
  mainOrange,
  textDark,
} from "../constants/StyleColors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getMyPets } from "../api/PetStore";
import MyPetsList from "../components/MyPetsList";

const BaseContainer = styled.View`
  height: 100%;
  align-items: center;
  background-color: ${mainBackgroundColor};
`;

const UserInfoContainer = styled.View`
  margin-top: 20px;
  background-color: white;
  padding: 15px;
  width: 80%;
  border-top-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 15px;
`;
const IconContainer = styled.View`
  width: 32px;
  height: 32px;
  background-color: ${mainOrange};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
const UserInfoRow = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
`;
const UserInfoHeader = styled.Text`
  font-size: 22px;
  font-family: "MontserratBold";
  color: ${textDark};
`;
const UserInfoText = styled.Text`
  margin-left: 10px;
  font-family: "MontserratRegular";
  font-size: 15px;
`;

const MyPetsContainer = styled.View`
  margin-top: 20%;
  width: 80%;
  background-color: white;
  padding: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 15px;
`;
const MyPetsHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MyPetsHeader = styled.Text`
  font-size: 22px;
  font-family: "MontserratBold";
`;
const AddPetButton = styled.TouchableOpacity`
  background-color: ${mainOrange};
  width: 30px;
  height: 30px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  background-color: ${mainOrange};
  width: 99px;
  height: 57px;
  border-radius: 30px;
  bottom: 20px;
  right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LogoutButtonText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
`;

// function fetchMyPets(user: User, setMyPets) {
//   getMyPets(user).then((pets) => setMyPets(pets));
// }

export default function MyProfileScreen({ user }: { user: User }) {
  const [myPets, setMyPets] = React.useState<null | Pet[]>(null);
  const navigation = useNavigation();

  const renderIcon = (iconName) => {
    return (
      <IconContainer>
        <Ionicons name={iconName} size={20} color="white" />
      </IconContainer>
    );
  };
  const fetchPets = async () => {
    const result = await getMyPets(user).then((pets) => {
      return pets;
    });
    setMyPets(result);
  };

  React.useEffect(() => {
    fetchPets();
  }, [user.pets]);

  return (
    <BaseContainer>
      <MyPetsContainer>
        <MyPetsHeaderContainer>
          <MyPetsHeader>Mín Dýr</MyPetsHeader>
          <AddPetButton onPress={() => navigation.navigate("AddPetScreen")}>
            <Ionicons name="add-outline" size={26} color="white" />
          </AddPetButton>
        </MyPetsHeaderContainer>
        {myPets && myPets.length > 0 ? (
          <MyPetsList
            pets={myPets}
            onPetPress={() => console.log("Todo: edit pet")}
            selectedPet={null}
          />
        ) : null}
      </MyPetsContainer>
      <UserInfoContainer>
        <UserInfoHeader>Mínar Upplýsingar</UserInfoHeader>
        <UserInfoRow>
          {renderIcon("person-outline")}
          <UserInfoText>{user.name}</UserInfoText>
        </UserInfoRow>
        {user.email ? (
          <UserInfoRow>
            {renderIcon("mail-outline")}
            <UserInfoText>{user.email}</UserInfoText>
          </UserInfoRow>
        ) : null}
        {user.phoneNumber ? (
          <UserInfoRow>
            {renderIcon("call-outline")}
            <UserInfoText>{user.phoneNumber}</UserInfoText>
          </UserInfoRow>
        ) : null}
      </UserInfoContainer>
      <LogoutButton
        onPress={() =>
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("logged out");
            })
        }
      >
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </BaseContainer>
  );
}
