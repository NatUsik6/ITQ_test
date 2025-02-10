import "./App.css";
import {
  Button,
  Container,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  age: string;
  email: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = (data: FormData) => {
    alert(`Имя: ${data.name}\nВозраст: ${data.age}\nEmail: ${data.email}`);
    reset();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Форма ввода
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Имя"
            fullWidth
            margin="normal"
            {...register("name", {
              required: "Введите имя",
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё]+$/u,
                message: "Только буквы",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Возраст"
            fullWidth
            margin="normal"
            {...register("age", {
              required: "Введите возраст",
              pattern: { value: /^[0-9]+$/, message: "Только цифры" },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {!isValid && (
            <Typography color="error" sx={{ mt: 2 }}>
              Исправьте ошибки в форме
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Проверить данные
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default App;
