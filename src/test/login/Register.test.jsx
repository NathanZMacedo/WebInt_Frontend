import React from "react";
import { screen, render, fireEvent } from "@testing-library/react"; 
import "@testing-library/jest-dom/extend-expect"

import RegisterForm from "../../components/auth/register/Register.jsx";

describe("Componente RegisterForm", () => {
    test("renderiza o formulario de registro com campos de nome, email, idade, senha e confirmar senha e um botão de enviar", () => {
        render(<RegisterForm onSubmitForm={jest.fn()}/>);

        expect(screen.getByText("Criar usuário")).toBeInTheDocument();
        // expect(screen.getByTestId("name-input ")).toBeInTheDocument();
        // expect(screen.getByTestId("email-input")).toBeInTheDocument();
        // expect(screen.getByTestId("quantity-input")).toBeInTheDocument();
        // expect(screen.getByTestId("password-input")).toBeInTheDocument();
        // expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument();
        // expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    })
    test("atualiza os valores dos campos de nome, email, idade, senha e confirmar senha ao alterar", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const nameInput = screen.getByTestId("123");
        const emailInput = screen.getByTestId("email-input");
        const quantityInput = screen.getByTestId("quantity-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");

        fireEvent.change(nameInput, { target: { value: "test" }});
        fireEvent.change(emailInput, { target: { value: "test@example.com" }});
        fireEvent.change(quantityInput, { target: { value: "20" }});
        fireEvent.change(passwordInput, { target: { value: "123456" }});
        fireEvent.change(confirmPasswordInput, { target: { value: "123456" }});

        expect(nameInput.value).toBe("test")
        expect(emailInput.value).toBe("test@example.com")
        expect(quantityInput.value).toBe("20")
        expect(passwordInput.value).toBe("123456")
        expect(confirmPasswordInput.value).toBe("123456")
    });

    test("chama onSubmitForm com os dados do usuario quando o formulario é enviado", () => {
        const mockSubmit = jest.fn();
        render(<RegisterForm onSubmitForm={mockSubmit} />);

        const nameInput = screen.getByTestId("123");
        const emailInput = screen.getByTestId("email-input");
        const quantityInput = screen.getByTestId("quantity-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input");
        const submitButton = screen.getByTestId("submit-button");

        fireEvent.change(nameInput, { target: { value: "test" }});
        fireEvent.change(emailInput, { target: { value: "test@example.com" }});
        fireEvent.change(quantityInput, { target: { value: "20" }});
        fireEvent.change(passwordInput, { target: { value: "123456" }});
        fireEvent.change(confirmPasswordInput, { target: { value: "123456" }});
        fireEvent.click(submitButton);  
        });

        test("mostrar mensagem do erro para nome invalido", () => {
            render(<RegisterForm onSubmitForm={jest.fn()} />);

            fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Jo"} })
            fireEvent.change(nameInput, { target: { value: "Yan" } });

            expect(screen.getByText("error-name")).toHaveTextContent("Nome precisa ter mais de 3 letras.");
        });
        test("mostrar mensagem do erro para email invalido", () => {
            render(<RegisterForm onSubmitForm={jest.fn()} />);

            fireEvent.change(screen.getByTestId("email-input"), { target: { value: "invalid-email"}})
            fireEvent.change(emailInput, { target: { value: "test" } });

            expect(screen.getByText("error-email")).toHaveTextContent("Email inválido.");
        });
        test("mostrar mensagem do erro para idade invalida", () => {
            render(<RegisterForm onSubmitForm={jest.fn()} />);

            fireEvent.change(screen.getByTestId("email-input"), { target: { value: "invalid-email"}})
            fireEvent.change(quantityInput, { target: { value: "10" } });

            expect(screen.getByText("error-quantity")).toHaveTextContent("Idade precisa ser maior que 18 anos.");
        }); 
        test("mostrar mensagem do erro para senha invalida", () => {
            render(<RegisterForm onSubmitForm={jest.fn()} />);

            fireEvent.change(screen.getByTestId("password-input"), { target: { value: "pass"}})
            fireEvent.change(passwordInput, { target: { value: "123456" } });

            expect(screen.getByText("error-password")).toHaveTextContent("Senha precisa ter mais de 6 letras, um número e um caractere especial.");
        });
        test("mostrar mensagem do erro para confirmar senha invalida", () => {
            render(<RegisterForm onSubmitForm={jest.fn()} />);

            fireEvent.change(screen.getByTestId("password-input"), { target: { value: "invalid-password"}})
            fireEvent.change(screen.getByTestId("confirmPassword-input"), { target: { value: "invalid-confirmPassword"}})
            fireEvent.change(passwordInput, { target: { value: "123456" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "1234567" } });

            expect(screen.getByText("error-confirmPassword")).toHaveTextContent("As senhas não coincidem.");
        });
})