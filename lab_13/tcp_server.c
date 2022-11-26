#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>
#define PORT 3000

int main(int argc, char const* argv[])
{
    int server_fd, new_socket, valread;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);
    char buffer[1024] = { 0 };
    char* hello = "Hello from server";
    char* prefix = "ECHO: ";
    char* echo_message = malloc(sizeof(char) * 1024);

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    if (setsockopt(server_fd, SOL_SOCKET,SO_REUSEADDR | SO_REUSEPORT, &opt,sizeof(opt))) {
        perror("setsockopt");
        exit(EXIT_FAILURE);
    }
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }
    if (listen(server_fd, 3) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }
    if ((new_socket = accept(server_fd, (struct sockaddr*)&address,(socklen_t*)&addrlen)) < 0) {
        perror("accept");
        exit(EXIT_FAILURE);
    }

    printf("connected\n");

    while ((valread = recv(new_socket, buffer, 1024, 0))) {
        printf("RECV: %s\n", buffer);

        memset(echo_message, 0, strlen(prefix) + strlen(buffer));
        echo_message = strcat(echo_message, prefix);
        echo_message = strcat(echo_message, buffer);

        send(new_socket, echo_message, strlen(echo_message), 0);
        sleep(1);

        // free(echo_message);
    }

    close(new_socket);
    shutdown(server_fd, SHUT_RDWR);
    return 0;
}
// #include <stdio.h>
// #include <stdlib.h>
// #include <strings.h>
// #include <sys/socket.h>
// #include<arpa/inet.h>	
// #include <string.h>

// int main(int argc, char **argv) {
//     int sockfd, connfd, len, n;
//     struct sockaddr_in server, client;
//     char buff[200];

//     sockfd = socket(AF_INET, SOCK_STREAM, 0);
//     if (sockfd == -1) {
//         printf("creating socket failed");
//         exit(1);
//     }

//     bzero(&server, sizeof(server));

//     server.sin_family = AF_INET;
//     server.sin_addr.s_addr = htonl(INADDR_ANY);
//     server.sin_port = htons(3000);

//     if ((bind(sockfd, &server, sizeof(server))) != 0) {
//         printf("socket bind failed\n");
//         exit(0);
//     }

//     if (listen(sockfd, 5) != 0) {
//         printf("Listen failed\n");
//         exit(0);
//     }

//     len = sizeof(client);
//     connfd = accept(sockfd, &client, &len);
//     if (connfd < 0) {
//         printf("server accept failed...\n");
//         exit(0);
//     }

//     while( (n = recv(sockfd , buff , 200, 0)) > 0 )
// 	{
// 		send(connfd, buff, strlen(buff), 0);
// 	}

//     close(sockfd);
// }
