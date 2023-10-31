import React, { useEffect } from "react";
import { CardContainer, Container, FooterButtonContainer, HeaderContainer, HomeContainer, MainCardContainer, Title, TopContainer, UserContainer } from "./styles";
import { ADVICE, AUTH_MODULE, CONTENT_MODULE, CREATE, DELETE, MODULE, MODULE_TITLE, NUMBER_OF_USERS_IN, SUBMIT } from "@constants";
import { usersGET } from "src/services/api/usersGET";
import { Button } from "@components";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setData, setModuleKeySelected, setModuleSelected, setUserSelected } from "@redux/slices/usersSlice";
import { userDeletePOST } from "src/services/api/userDeletePOST";
import { userCreatePOST } from "src/services/api/userCreatePOST";


const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.users.data);
  const module = useAppSelector((state) => state.users.moduleSelected);
  const moduleKey = useAppSelector((state) => state.users.moduleKeySelected);
  const userSelected = useAppSelector((state) => state.users.userSelected);
  const keysToRender = module === CONTENT_MODULE ? data?.content_module : data?.auth_module;

  useEffect(() => {
    usersGET() // API call for Data
        .then(data => {
            if (data) {
              dispatch(setData(data))
            }
        })
        .catch(error => {
            console.error("Error to obtain data of users:", error);
        });
  }, []);

  const handleClickModule = (type: string) => {
    dispatch(setModuleSelected(type));
    dispatch(setModuleKeySelected(""));
    dispatch(setUserSelected(""));
  }

  const handleClickDelete = () => {
    if(data)
      userDeletePOST(userSelected, data, dispatch);
    dispatch(setUserSelected(""));
  }

  const handleClickCreate = () => {
    userCreatePOST(dispatch);
  }

  return (
    <HomeContainer>
      <MainCardContainer>
        <HeaderContainer>
          <Button typeOfButton="default" onClick={() => handleClickModule(CONTENT_MODULE)} label={CONTENT_MODULE} selected={module === CONTENT_MODULE} />
          <Button typeOfButton="default" onClick={() => handleClickModule(AUTH_MODULE)} label={AUTH_MODULE} selected={module === AUTH_MODULE} />
        </HeaderContainer>
        <CardContainer>
          <Container>
            <HeaderContainer>
              {keysToRender && data && Object.keys(keysToRender).sort().map((key) => (
                <Button
                  key={key}
                  typeOfButton="default"
                  onClick={() => dispatch(setModuleKeySelected(key))}
                  label={`${MODULE} ${key.split("_")[1]}`}
                  selected={moduleKey === key}
                />
              ))}
            </HeaderContainer>
            <TopContainer>
              {data && moduleKey && <Title>{NUMBER_OF_USERS_IN} {MODULE_TITLE} {moduleKey.split("_")[1]}:</Title>}
              <UserContainer>
                { data && module && moduleKey && keysToRender && keysToRender[moduleKey]?.slice().sort((a, b) => {
                  const userNumberA = parseInt(a.split(' ')[1]);
                  const userNumberB = parseInt(b.split(' ')[1]);
                  return userNumberA - userNumberB;
                }).map((user) => (
                  <Button
                    key={user}
                    typeOfButton="default"
                    onClick={() => dispatch(setUserSelected(user))}
                    label={user}
                    selected={userSelected === user}
                    userButton
                  />
                ))}
              </UserContainer>
            </TopContainer>
          </Container>
          <FooterButtonContainer>
            <Button
                typeOfButton="delete"
                onClick={() => handleClickDelete()}
                label={DELETE}
              />
            <Button
                typeOfButton="advice"
                onClick={() => console.log("Advice")}
                label={ADVICE}
              />
            <Button
                typeOfButton="create"
                onClick={() => handleClickCreate()}
                label={CREATE}
              />
            <Button
                typeOfButton="submit"
                onClick={() => console.log("Submit things")}
                label={SUBMIT}
              />
          </FooterButtonContainer>
        </CardContainer>
      </MainCardContainer>
    </HomeContainer>
  );
};
export default HomePage;