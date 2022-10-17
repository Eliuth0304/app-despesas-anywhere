import { useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { useAuthContext } from '../shared/contexts';

interface State {
    password: string;
    showPassword: boolean;
}

interface IUsuarioProps {
    children: React.ReactNode;

}


export const PrimeiroAcesso: React.FC<IUsuarioProps> = ({children}) => {
    const { isAuthenticated } = useAuthContext();
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
    });

    const [valuesCPassword, setValuesCpassword] = useState<State>({
        password: '',
        showPassword: false,
    });



    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangeCPassword =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValuesCpassword({ ...valuesCPassword, [prop]: event.target.value });
        };

    const handleClickShowCPassword = () => {
        setValuesCpassword({
            ...valuesCPassword,
            showPassword: !valuesCPassword.showPassword,
        });
    };

    const handleMouseDownCPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    if (isAuthenticated === false) {
        return (<>{children}</>);
    }
    else {

        return (
            <Box
                gap={1}
                margin={2}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper} >

                <TextField size="small" label="Nome" inputProps={{ maxLength: 50 }} fullWidth />
                <TextField size="small" label='Sobre nome' inputProps={{ maxLength: 50 }} fullWidth />
                <TextField size="small" label='Telefone' inputProps={{ maxLength: 15, type: 'tel' }} fullWidth />
                <TextField size="small" label='Email' inputProps={{ maxLength: 50, type: 'email' }} fullWidth />
                <FormControl size="small" fullWidth variant="outlined" >
                    <InputLabel htmlFor="txtPassword">Senha</InputLabel>
                    <OutlinedInput
                        id="txtPassword"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Senha"
                        inputProps={{ maxLength: 50 }}
                    />
                </FormControl>


                <FormControl size="small" fullWidth variant="outlined" >
                    <InputLabel htmlFor="txtConfirmPassword">Confirma Senha</InputLabel>
                    <OutlinedInput
                        id="txtConfirmPassword"
                        type={valuesCPassword.showPassword ? 'text' : 'password'}
                        value={valuesCPassword.password}
                        onChange={handleChangeCPassword('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowCPassword}
                                    onMouseDown={handleMouseDownCPassword}
                                    edge="end"
                                >
                                    {valuesCPassword.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirma Senha"
                        inputProps={{ maxLength: 50 }}
                    />
                </FormControl>

                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<SaveIcon />}
                >Salvar</Button>
            </Box>
        );
    }

}
