#include <iostream>

bool isPowerOfTwo(int n) {
    if (n <= 0) return false;
    return (n & (n - 1)) == 0;
}

int main() {
    int num;
    std::cout << "Enter a number: ";
    std::cin >> num;
    
    if (isPowerOfTwo(num))
        std::cout << num << " is a power of two." << std::endl;
    else
        std::cout << num << " is not a power of two." << std::endl;

    return 0;
}
