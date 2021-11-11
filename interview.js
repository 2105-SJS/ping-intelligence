
var isPalindrome = function(s) 
{
    let left=0;
    let right=s.length-1;

    while(left<right)
    {
        if(s.charAt(left)!==s.charAt(right))
        {
            return false;
        }
        left++;
        right--;
    }
    return true;
};

const testStrings=["a","cat","bob", "abba", "abaa"];
testStrings.forEach((str)=>
{
    console.log(isPalindrome(str));
});