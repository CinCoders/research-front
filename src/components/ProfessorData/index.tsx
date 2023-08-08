import { Box, Avatar, CircularProgress, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from '@cincoders/cinnamon';
import HumanResourcesService from '../../services/HumanResourcesService';
import { ProfessorHr } from '../../types/HRProfessor.d';
import {
  Field,
  FieldValue,
  LattesValues,
  LabelBox1,
  LabelBox2,
  TitleBox,
  Name,
  CustomName,
  Email,
  MainField,
  ProfessorDataBox,
  ProfessorInfoHolder,
  ProfessorInfoHeader,
  LinksWrapper,
} from './styles';
import { LinkButton } from '../LinkButton';
import { Links } from '../../types/enums';
import lattesLogo from '../../assets/icons/lattesLogo.svg';
import { LattesText } from '../LattesText';
import { apiHr } from '../../services/api';

interface ProfessorDataProps {
  id: number;
  name: string;
  lattesCode: string | undefined;
}

function ProfessorData({ id, name, lattesCode }: ProfessorDataProps) {
  const [professorHr, setProfessorHr] = useState<ProfessorHr>({
    id,
    name,
    email: '-',
    workRegime: '-',
    phone: '-',
    fax: '-',
    room: '-',
    website: '-',
    lattes: '-',
    status: '-',
    positionName: '-',
    researchAreasName: ['-'],
    rolesDescription: ['-'],
  });
  const [loadingProgress, setLoadingProgress] = useState<boolean>(true);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    async function get() {
      if (lattesCode && apiHr) {
        try {
          setProfessorHr(currentValue => ({ ...currentValue, name }));
          const response = await HumanResourcesService.getProfessors(lattesCode);
          const professorResponse: ProfessorHr[] = response.data.map(professorHrResponse => {
            const positionName: string = professorHrResponse.position?.name;
            const rolesDescription: string[] = professorHrResponse.employeeRoles.map(
              (role: { description: string }) => role.description,
            );
            const researchAreasName: string[] = professorHrResponse.researchAreas.map(
              (researchArea: { name: string }) => researchArea.name,
            );
            return {
              id: professorHrResponse.id,
              name: professorHrResponse.name,
              email: professorHrResponse.email,
              fax: professorHrResponse.fax,
              imageUrl: professorHrResponse.imageUrl,
              lattes: professorHrResponse.lattes,
              phone: professorHrResponse.phone,
              positionName,
              room: professorHrResponse.room,
              status: professorHrResponse.status,
              website: professorHrResponse.website,
              workRegime: professorHrResponse.workRegime,
              rolesDescription,
              researchAreasName,
            };
          });
          setProfessorHr(professorResponse[0]);
        } catch {
          toast.error('Não foi possível obter as informações do professor', { containerId: 'page' });
          setAlert(true);
        }
      }
      setLoadingProgress(false);
    }
    get();
  }, [lattesCode, name]);

  const rolesDescriptionMap = professorHr?.rolesDescription.map((description, index) => {
    if (index !== Number(professorHr?.rolesDescription.length) - 1) {
      return `${description}, `;
    }
    return `${description}`;
  });

  const researchAreasNameMap = professorHr?.researchAreasName.map((areaName, index) => {
    if (index !== Number(professorHr?.researchAreasName.length) - 1) {
      return `${areaName}, `;
    }
    return `${areaName}`;
  });

  function returnCircularProgress() {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: '2em',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  function returnData() {
    if (process.env.REACT_APP_URL_HR !== '' && process.env.REACT_APP_URL_HR !== undefined) {
      return (
        <Box
          sx={{
            display: 'inline',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginBottom: '10px',
            }}
          >
            <Avatar
              alt='Imagem do Professor'
              src={professorHr?.imageUrl}
              sx={{
                width: '100px',
                height: '100px',
              }}
            />
            <Box
              sx={{
                alignSelf: 'center',
                marginLeft: '20px',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Name>{professorHr?.name}</Name>
                {!alert ? (
                  <>
                    <Email>-</Email>
                    <Email>{professorHr?.email}</Email>
                  </>
                ) : (
                  ''
                )}
              </Box>
              <Box
                sx={{
                  display: 'inline',
                }}
              >
                <MainField>{professorHr?.positionName}</MainField>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <MainField
                    sx={{
                      marginRight: '5px',
                    }}
                  >
                    Regime:
                  </MainField>
                  <MainField>{professorHr?.workRegime}</MainField>
                </Box>
                <MainField>{professorHr?.status}</MainField>
              </Box>
              {alert ? <Alert severity='error'>Não foi possível obter as informações do professor</Alert> : ''}
            </Box>
          </Box>
          <Box
            sx={{
              border: 0.1,
              borderRadius: 1,
              borderColor: '#f6c7cb',
              width: '100%',
              marginBottom: '1em',
              paddingBottom: '15px',
            }}
          >
            <TitleBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <h3>Dados Pessoais</h3>
            </TitleBox>
            <ProfessorDataBox>
              <Box
                sx={{
                  display: 'inline',
                  width: '35%',
                }}
              >
                <Field>
                  <LabelBox1>Telefone:</LabelBox1>
                  <FieldValue>{professorHr?.phone}</FieldValue>
                </Field>
                <Field>
                  <LabelBox1>Fax:</LabelBox1>
                  <FieldValue>{professorHr?.fax}</FieldValue>
                </Field>
                <Field>
                  <LabelBox1>Sala:</LabelBox1>
                  <FieldValue>{professorHr?.room}</FieldValue>
                </Field>
                <Field>
                  <LabelBox1>Website:</LabelBox1>
                  <FieldValue>
                    {!alert ? (
                      <a color='#B83232' href={professorHr?.website}>
                        {professorHr?.website}
                      </a>
                    ) : (
                      professorHr?.website
                    )}
                  </FieldValue>
                </Field>
                <Field>
                  <LabelBox1>Lattes:</LabelBox1>
                  <LattesValues display='flex' alignItems='center' justifyContent='space-between' height='2em'>
                    <LinkButton
                      route={Links.LATTES.replace(':id', lattesCode as string)}
                      newTab
                      image={lattesLogo}
                      width='6em'
                      height='80%'
                    />
                    <LinkButton
                      iconComponent={<DownloadIcon color='primary' />}
                      route={Links.PROFESSOR_XML.replace(':id', lattesCode as string)}
                      newTab
                      marginLeft='1em'
                      marginRight='1em'
                      width='10%'
                      description='Download do XML do currículo lattes'
                    />
                    <LattesText text={lattesCode as string} />
                  </LattesValues>
                </Field>
              </Box>
              <Box
                sx={{
                  display: 'inline',
                  width: '65%',
                }}
              >
                <Field>
                  <LabelBox2>Áreas de pesquisa:</LabelBox2>
                  <FieldValue>{researchAreasNameMap}</FieldValue>
                </Field>
                <Field>
                  <LabelBox2>Descrição de papéis:</LabelBox2>
                  <FieldValue>{rolesDescriptionMap}</FieldValue>
                </Field>
              </Box>
            </ProfessorDataBox>
          </Box>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          display: 'inline',
        }}
      >
        <ProfessorInfoHeader>
          <Box
            sx={{
              alignSelf: 'center',
              marginLeft: '20px',
            }}
          >
            <ProfessorInfoHolder>
              <CustomName>{name}</CustomName>
              <LattesValues>
                <LinksWrapper>
                  <LinkButton
                    route={Links.LATTES.replace(':id', lattesCode as string)}
                    newTab
                    image={lattesLogo}
                    width='6em'
                    height='80%'
                  />
                  <LinkButton
                    iconComponent={<DownloadIcon color='primary' />}
                    route={Links.PROFESSOR_XML.replace(':id', lattesCode as string)}
                    newTab
                    marginLeft='1em'
                    marginRight='1em'
                    width='10%'
                    description='Download do XML do currículo lattes'
                  />
                </LinksWrapper>

                <LattesText text={lattesCode as string} />
              </LattesValues>
            </ProfessorInfoHolder>
          </Box>
        </ProfessorInfoHeader>
      </Box>
    );
  }

  return loadingProgress ? returnCircularProgress() : returnData();
}

export default ProfessorData;
