<?php

namespace App\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\ORM\EntityManagerInterface;

use App\Repository\GroupRepository;
use App\Entity\Group;
use App\Form\GroupType;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @Route("/api",name="group_api")
 */
class GroupController extends FOSRestController
{
    /**
     * @Rest\Get("/group")
     * 
     * @return Response
     */
    public function readAllGroups(GroupRepository $groupRepository)
    {
        //get all users from database, return as json
        $groups = $groupRepository->findBy([], ['id' => 'DESC']);
        return $this->handleView($this->view($groups));
    }

    /**
     * @Rest\Get("/group/{id}")
     * 
     * @return Response
     */
    public function readGroup($id, GroupRepository $groupRepository)
    {
        //get all users from database, return as json
        $group = $groupRepository->findOneBy(["id" => $id]);
        if(!$group){ throw new NotFoundHttpException("Group Not Found"); }
        return $this->handleView($this->view($group));
    }

    /**
     * @Rest\Post("/group")
     * 
     * @return Response
     */
    public function addGroup(Request $request, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository)
    {
        $group = new Group();
        $data = json_decode($request->getContent($request), true);
        if(!isset($data["name"]) || strlen($data["name"]) === 0 ){
            throw new NotAcceptableHttpException("Name is required");
        }

        //users come in as array of objects, we just care about the ids
        if (isset($data["users"]) &&  count($data["users"]) > 0) {
            foreach ($data["users"] as $user) {
                $group->addUser($userRepository->find($user["id"]));
            }
            unset($data["users"]);
        }
        $form = $this->createForm(GroupType::class, $group);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            //save and return
            $entityManagerInterface->persist($group);
            $entityManagerInterface->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }
        return $this->handleView($this->view($form->getErrors()));
    }

    /**
     * @Rest\Patch("/group/{id}/addUser")
     * 
     * @return Response
     */
    public function groupAddUser($id, Request $request, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository, GroupRepository $groupRepository)
    {
        $group = $groupRepository->find($id);
        if (!$group) {
            throw new NotFoundHttpException("Group Not Found");
        }

        $data = json_decode($request->getContent($request), true);
        if (!isset($data["name"]) || strlen($data["name"]) === 0) {
            throw new NotAcceptableHttpException("Name is required");
        }
        
        //users come in as array of objects, we just care about the ids
        if (isset($data["users"]) &&  count($data["users"]) > 0) {
            foreach ($data["users"] as $user) {
                $group->addUser($userRepository->findOneBy(["id" => $user["id"]]));
            }
        }

        $entityManagerInterface->persist($group);
        $entityManagerInterface->flush();
        
        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_NO_CONTENT));
    }


    /**
     * @Rest\Patch("/group/{id}/removeUser")
     * 
     * @return Response
     */
    public function groupRemoveUser($id, Request $request, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository, GroupRepository $groupRepository)
    {
        $group = $groupRepository->find($id);
        if (!$group) {
            throw new NotFoundHttpException("Group Not Found");
        }

        $data = json_decode($request->getContent($request), true);
        if (!isset($data["name"]) || strlen($data["name"]) === 0) {
            throw new NotAcceptableHttpException("Name is required");
        }

        //users come in as array of objects, we just care about the ids
        if (isset($data["users"]) &&  count($data["users"]) > 0) {
            foreach ($data["users"] as $user) {
                $group->removeUser($userRepository->findOneBy(["id" => $user["id"]]));
            }
        }

        $entityManagerInterface->persist($group);
        $entityManagerInterface->flush();
        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_NO_CONTENT));
    }


    /**
     * @Rest\Put("/group/{id}")
     * 
     * @return Response
     */
    public function updateGroup($id, Request $request, EntityManagerInterface $entityManagerInterface, UserRepository $userRepository, GroupRepository $groupRepository)
    {
        $group = $groupRepository->find($id);
        if (!$group) {
            throw new NotFoundHttpException("Group Not Found");
        }

        $data = json_decode($request->getContent($request), true);
        if (!isset($data["name"]) || strlen($data["name"]) === 0) {
            throw new NotAcceptableHttpException("Name is required");
        }
        $form = $this->createForm(GroupType::class, $group);

        //users come in as array of objects, we just care about the ids
        if (isset($data["users"]) && count($data["users"]) > 0) {
            foreach ($data["users"] as $user) {
                $group->addUser($userRepository->find($user["id"]));
            }
            unset($data["users"]);
        }    

        
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            //save and return
            $entityManagerInterface->persist($group);
            $entityManagerInterface->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }
        return $this->handleView($this->view($form->getErrors()));
    }

    /**
     * @Rest\Delete("/group/{id}")
     * 
     * @return Response
     */
    public function deleteGroup($id, EntityManagerInterface $entityManagerInterface, GroupRepository $groupRepository)
    {
        $group = $groupRepository->find($id);
        if (!$group) {
            throw new NotFoundHttpException("Group Not Found");
        }

        if(count($group->getUsers()) > 0){
            throw new NotAcceptableHttpException("Group with users cannot be deleted");
        }

        $entityManagerInterface->remove($group);
        $entityManagerInterface->flush();
        return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_NO_CONTENT));
    }
}
