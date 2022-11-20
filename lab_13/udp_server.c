#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
	
#define PORT	 3000
#define MAX 1024
	
int main() {
	int sockfd;
	int len, n;
    char* echo_message = malloc(sizeof(char) * 1024);
    char* prefix = "ECHO: ";
	char buffer[MAX];

    
	struct sockaddr_in servaddr, cliaddr;
		
	if ( (sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0 ) {
		perror("socket creation failed");
		exit(EXIT_FAILURE);
	}
		
	memset(&servaddr, 0, sizeof(servaddr));
	memset(&cliaddr, 0, sizeof(cliaddr));
		
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = INADDR_ANY;
	servaddr.sin_port = htons(PORT);
		
	if ( bind(sockfd, (const struct sockaddr *)&servaddr,sizeof(servaddr)) < 0 )
	{
		perror("bind failed");
		exit(EXIT_FAILURE);
	}
		
	
	len = sizeof(cliaddr);
	
	while ((n = recvfrom(sockfd, (char *)buffer, MAX, MSG_WAITALL, ( struct sockaddr *) &cliaddr, (socklen_t*)&len))){
        printf("RECV: %s\n", buffer);

        memset(echo_message, 0, strlen(buffer) + strlen(prefix));
        echo_message = strcat(echo_message, prefix);
        echo_message = strcat(echo_message, buffer);

        sendto(sockfd, echo_message, strlen(echo_message), MSG_CONFIRM, (const struct sockaddr *) &cliaddr, len);

        sleep(1);
    }
		
	return 0;
}
