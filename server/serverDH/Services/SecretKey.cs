using serverDH.Interfaces;
using System;
using System.Collections.Generic;

namespace serverDH.Services
{
    public class SecretKey : ISecretKey
    {
        public string username { get; set; }
        public string publickey { get; set; }
        public List<SecretKey> UserKey = new List<SecretKey>();
        public string[] testarray;
        public int i = 0;

        public void AddUserList(string u, string p)
        {
           UserKey.Add(new SecretKey() { username = u, publickey = p });
        }

        public int LengthUserList()
        {
            Console.WriteLine(UserKey.Count);
            return UserKey.Count;
        }

        public void GetAllList()
        {
            /* foreach(SecretKey us in UserKey) {
                 Console.WriteLine(us.username, us.publickey);
                 //return us;
             }*/
           foreach(string x in testarray)
            {
                Console.Write(x);
            }
        }

        public void KeyExchange(int n)
        {
            for (var i = 0; i < (n - 1); i++)
            {
                for (var p = 0; p < n; p++)
                {
                    if (i == 0)
                    {
                        if (p == (n - 1))
                        {
                            //Wywoluje sie funkcja ktora przekazuje uzytkownikowi usr[p] klucz publiczny uzytkownika usr[0]
                        }
                        else
                        {
                            //Wywoluje sie funkcja ktora przekazuje uzytkownikowi usr[p] klucz publiczny uzytkownika usr[p + 1]
                        }
                    }
                    else
                    {
                        if (p == (n - 1))
                        {
                            //Wywoluje sie funkcja ktora przekazuje uzytkownikowi usr[p] sekret uzytkownika usr[0]
                        }
                        else
                        {
                            if (p == 0)
                            { //secretZero = userSecret[p]; }
                              //Wywoluje sie funkcja ktora przekazuje uzytkownikowi usr[p] sekret uzytkownika usr[p+1]
                            }
                        }
                    }
                    //Nastepuje oczekiwanie na otrzymanie obliczonych wartosci od uzytkownikow (jakis delay)");
                }
            }
        }
    }
}
