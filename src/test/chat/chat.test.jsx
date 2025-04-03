import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Chat from "../../components/chat/Chat";
import { io } from "socket.io-client";
import MockAdapter from "axios-mock-adapter";
import { Server } from "socket.io";
import { createServer } from "http";
import axios from "axios";

goblal.setImediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));

const mock = new MockAdapter(axios.default);

Element.prototype.scrollIntoView = jest.fn();

jest.setTimeout(10000);

describe("Testando o componente de chat", () => {
    let ioServer, socket;

    beforeAll((done) => {
        const httpServer = createServer();
        ioServer = new Server(httpServer);

        httpServer.listen( () => {
            const { port } = httpServer.address();
            socket = io(`http://localhost:${port}`);
            done();
        });
    });

    afterAll((done) => {
    if (socket) {
        socket.close();
    }
    if (ioServer) {
        ioServer.close;
    }
    done();
    });

    test("Vamos testar a comunicação axios e socket.io", async () => {
        mock.onGet("/api/some-endpoint").reply(200, { data: "some data" });

        render(<Chat socket={socket} />);
        
        fireEvent.change(screen.getByTestId("message-input"), { target: { value: "Hello, world!" }});   
        fireEvent.click(screen.getByTestId("send-button"));
    })
})
