<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Form\UserType;
use App\Repository\GroupRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @Route("/api",name="user_api")
 */
class UserController extends FOSRestController
{
    /**
     * @Rest\Get("/user")
     * 
     * @return Response
     */
    public function readAllUsers(UserRepository $userRepository)
    {
        //get all users from database, return as json
        $users = $userRepository->findBy([],['id'=>'DESC']);
        return $this->handleView($this->view($users));
    }


    /**
     * @Rest\Get("/user/{id}")
     * 
     * @return Response
     */
    public function readUser($id,UserRepository $userRepository)
    {
        //get all users from database, return as json
        $users = $userRepository->findOneBy(["id"=>$id]);
        if(!$users){
            throw new NotFoundHttpException("User Not Found");
        }
        return $this->handleView($this->view($users));
    }

    /**
     * @Rest\Post("/user")
     * 
     * @return Response
     */
    public function addUser(Request $request, EntityManagerInterface $entityManagerInterface, GroupRepository $groupRepository)
    {
        $user = new User();
        $data = json_decode($request->getContent($request), true);
        if (!isset($data["name"]) || strlen($data["name"]) === 0) {
            throw new NotAcceptableHttpException("Name is required");
        }

        //groups come in as array of objects, we just care about the ids
        if (isset($data["groups"]) &&  count($data["groups"]) > 0) {
            foreach ($data["groups"] as $group) {
                $user->addGroup( $groupRepository->find($group["id"]));
            }
            unset($data["groups"]);
        }

        $form = $this->createForm(UserType::class, $user);
        $form->submit($data);

        if($form->isSubmitted() && $form->isValid()){
            //save and return
            $entityManagerInterface->persist($user);
            $entityManagerInterface->flush();
            return $this->handleView($this->view(['status'=>'ok'], Response::HTTP_CREATED));
        }        
        return $this->handleView($this->view($form->getErrors()));
    }


    /**
     * @Rest\Put("/user/{id}")
     * 
     * @return Response
     */
    public function updateUser($id, Request $request, EntityManagerInterface $entityManagerInterface, GroupRepository $groupRepository, UserRepository $userRepository)
    {
        $user = $userRepository->findOneBy(["id"=>$id]);
        if (!$user) {
            throw new NotFoundHttpException("User Not Found");
        }

        $data = json_decode($request->getContent($request), true);
        if (!isset($data["name"]) || strlen($data["name"]) === 0) {
            throw new NotAcceptableHttpException("Name is required");
        }

        //groups come in as array of objects, we just care about the ids
        //TODO : use real update by takling a diff of current groups and required groups
        //HACK : delete all and then add new groups
        $user->removeAllGroups();
        if (isset($data["groups"]) && count($data["groups"]) > 0) {
            foreach ($data["groups"] as $group) {
                $user->addGroup($groupRepository->findOneBy(["id" => $group["id"]]));
            }
            unset($data["groups"]);
        }

        $form = $this->createForm(UserType::class, $user);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            //save and return
            $entityManagerInterface->persist($user);
            $entityManagerInterface->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_OK));
        }
        return $this->handleView($this->view($form->getErrors()));
    }


    /**
     * @Rest\Delete("/user/{id}")
     * 
     * @return Response
     */
    public function deleteUser($id, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        if (!$user) {
            throw new NotFoundHttpException("User Not Found");
        }
        $entityManagerInterface->remove($user);
        $entityManagerInterface->flush();
        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_NO_CONTENT));
    }

    /**
     * @Rest\Get("/user/{id}/groups")
     * 
     * @return Response
     */
    public function getUserGroups(int $id, UserRepository $userRepository)
    {
        $user = $userRepository->find($id);
        if (!$user) {
            throw new NotFoundHttpException("User Not Found");
        }
        $groups = $user->getGroups();

        //below can create problems, refactor after adding some groups
        return $this->handleView($this->view($groups));
    }
}