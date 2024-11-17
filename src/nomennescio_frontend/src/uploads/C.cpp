#include <stdio.h>

#define MAX_SIZE 100001
#define HASH_SIZE 262144

long long int hashTable[HASH_SIZE];
long long int countTable[HASH_SIZE];

int hash(long long int key) {
    return (key % HASH_SIZE + HASH_SIZE) % HASH_SIZE;
}

void insertOrUpdate(long long int key) {
    int index = hash(key);
    while (hashTable[index] != 0 && hashTable[index] != key) {
        index = (index + 1) % HASH_SIZE;
    }
    hashTable[index] = key;
    countTable[index]++;
}

long long int findMaxDoubleChunks(long long int *A, long long int N) {
    long long int maxDoubleChunks = 0;

    for (int i = 0; i < HASH_SIZE; i++) {
        hashTable[i] = 0;
        countTable[i] = 0;
    }

    for (long long int i = 0; i < N - 1; i++) {
        long long int targetSum = A[i] + A[i + 1];
        long long int count = 0;

        for (long long int j = 0; j < N - 1; j++) {
            long long int sum = A[j] + A[j + 1];
            if (sum == targetSum) {
                count++;
                j++; 
            }
        }

        if (count > maxDoubleChunks) {
            maxDoubleChunks = count;
        }
    }

    return maxDoubleChunks;
}

int main() {
    long long int N;
    scanf("%lld", &N); getchar();
    long long int A[MAX_SIZE];

    for (long long int i = 0; i < N; i++) {
        scanf("%lld", &A[i]);
    }

    long long int result = findMaxDoubleChunks(A, N);
    printf("%lld\n", result);

    return 0;
}

